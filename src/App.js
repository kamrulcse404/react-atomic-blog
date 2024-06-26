import React, { useContext, useEffect, useState } from "react";
import { PostProvider, usePosts } from "./PostProvider";

import { faker } from "@faker-js/faker";

// Function to create a random post
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

function App() {
  const [isFakeDark, setIsFakeDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("fake-dark-mode", isFakeDark);
  }, [isFakeDark]);

  return (
    <section>
      <button
        onClick={() => setIsFakeDark((prevIsFakeDark) => !prevIsFakeDark)}
        className="btn-fake-dark-mode"
      >
        {isFakeDark ? "☀️" : "🌙"}
      </button>

      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}

function Header() {
  const { onClearPosts } = usePosts();

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePosts();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

function Results() {
  const { posts } = usePosts();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

function Main() {
  return (
    <main>
      <FormAddPost />
      <Posts />
    </main>
  );
}

function Posts() {
  return (
    <section>
      <List />
    </section>
  );
}

function FormAddPost() {
  const { onAddPost } = usePosts();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!body || !title) return;
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
      />
      <button>Add post</button>
    </form>
  );
}

function List() {
  const { posts } = usePosts();

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Archive() {
  const { onAddPost } = usePosts();

  const [showArchive, setShowArchive] = useState(false);

  const createRandomPosts = () => {
    return Array.from({ length: 10000 }, () => createRandomPost());
  };

  const handleAddArchivePosts = () => {
    const archivePosts = createRandomPosts();
    archivePosts.forEach((post) => onAddPost(post));
  };

  return (
    <aside>
      <h2>Post archive</h2>
      <button
        onClick={() => setShowArchive((prevShowArchive) => !prevShowArchive)}
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </button>

      {showArchive && (
        <div>
          <button onClick={handleAddArchivePosts}>Add Archive Posts</button>
        </div>
      )}
    </aside>
  );
}

function Footer() {
  return <footer>&copy; by The Atomic Blog ✌️</footer>;
}

export default App;
