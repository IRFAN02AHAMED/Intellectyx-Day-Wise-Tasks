import { useState } from "react";

function MessageForm({ addMessage }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    addMessage(name, message);

    setName("");
    setMessage("");
  };

  return (
    <>
      <h2>Create Message</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          placeholder="Write your message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button type="submit">
          Post
        </button>
      </form>
    </>
  );
}

export default MessageForm;