import { useState } from "react";
import ReplyList from "./ReplyList";

function MessageCard({
  message,
  onLike,
  onReply
}) {
  const [replyName, setReplyName] =
    useState("");

  const [replyText, setReplyText] =
    useState("");

  const handleReply = () => {
    if (
      !replyName.trim() ||
      !replyText.trim()
    )
      return;

    onReply(
      message.id,
      replyName,
      replyText
    );

    setReplyName("");
    setReplyText("");
  };

  return (
    <div className="message-card">
      <h4>{message.name}</h4>

      <p>{message.text}</p>

      <button
        className="like-btn"
        onClick={() =>
          onLike(message.id)
        }
      >
        👍 {message.likes}
      </button>

      <div className="reply-box">
        <input
          placeholder="Your name"
          value={replyName}
          onChange={(e) =>
            setReplyName(
              e.target.value
            )
          }
        />

        <input
          placeholder="Write a reply..."
          value={replyText}
          onChange={(e) =>
            setReplyText(
              e.target.value
            )
          }
        />

        <button onClick={handleReply}>
          Reply
        </button>
      </div>

      <ReplyList
        replies={message.replies}
      />
    </div>
  );
}

export default MessageCard;