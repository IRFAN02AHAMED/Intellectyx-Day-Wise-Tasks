import { useState } from "react";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Typography from "../common/Typography";

function MessageForm({
  onSubmit,
  buttonText = "Post",
  title = "Create Message",
  isReply = false,
}) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!to.trim() || !message.trim()) return;

    onSubmit(to, message);

    setTo("");
    setMessage("");
  };

  return (
    <div className={isReply ? "reply-form" : ""}>
      <Typography variant={isReply ? "h4" : "h2"}>
        {isReply ? "Reply" : title}
      </Typography>

      <form onSubmit={handleSubmit}>
        <InputField
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <TextAreaField
          placeholder="Write something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default MessageForm;