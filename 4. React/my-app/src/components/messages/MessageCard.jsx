import Typography from "../typography/Typography";
import MessageForm from "../forms/MessageForm";
import ReplyList from "./ReplyList";

function MessageCard({ message, onLike, onReply }) {
  return (
    <div className="message-card">

      {/* NAME */}
      <Typography variant="h4">
        {message.name}
      </Typography>

      {/* MESSAGE TEXT */}
      <Typography variant="p">
        {message.text}
      </Typography>

      {/* LIKE BUTTON */}
      <button onClick={() => onLike(message.id)}>
        👍 {message.likes}
      </button>

      {/* REPLY FORM */}
      <MessageForm
        isReply={true}
        buttonText="Reply"
        onSubmit={(name, text) =>
          onReply(message.id, name, text)
        }
      />

      {/* REPLIES LIST */}
      <ReplyList replies={message.replies} />

    </div>
  );
}

export default MessageCard;