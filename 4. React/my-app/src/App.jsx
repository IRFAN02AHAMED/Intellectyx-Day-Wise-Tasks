import { useState } from "react";
import MessageForm from "./components/MessageForm";
import SearchSort from "./components/SearchSort";
import MessageCard from "./components/MessageCard";
import "./styles.css";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Admin",
      text: "Welcome to the message board!",
      likes: 3,
      replies: []
    },
    {
      id: 2,
      name: "Irfan",
      text: "Feel free to post your thoughts.",
      likes: 1,
      replies: [{ name: "Guest", text: "Thanks!" }]
    }
  ]);

  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const addMessage = (name, text) => {
    const newMessage = {
      id: Date.now(),
      name,
      text,
      likes: 0,
      replies: []
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const likePost = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, likes: msg.likes + 1 }
          : msg
      )
    );
  };

  const addReply = (id, name, text) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              replies: [...msg.replies, { name, text }]
            }
          : msg
      )
    );
  };

  let filteredMessages = [...messages];

  filteredMessages = filteredMessages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.text.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "newest") {
    filteredMessages.reverse();
  }

  if (sort === "name") {
    filteredMessages.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      
      <div className="header">
        <h1>Message Board</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <p className="subtitle">
      Share thoughts, like posts, and reply to discussions.
      </p>

      <MessageForm addMessage={addMessage} />

      <SearchSort
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <h2>Messages</h2>

      <p className="result-count">
        Showing {filteredMessages.length} messages
      </p>

      {filteredMessages.map((msg) => (
        <MessageCard
          key={msg.id}
          message={msg}
          onLike={likePost}
          onReply={addReply}
        />
      ))}
    </div>
  );
}

export default App;