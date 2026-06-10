import { useState } from "react";
import InputField from "../ui/InputField";
import TextAreaField from "../ui/TextAreaField";
import Typography from "../typography/Typography";

function MessageForm({
  onSubmit,
  buttonText = "Post",
  title = "Create Message",
  isReply = false,
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    onSubmit(name, message);

    setName("");
    setMessage("");
  };

  return (
    <div className={isReply ? "reply-form" : ""}>

      <Typography variant={isReply ? "h4" : "h2"}>
        {isReply ? "Reply" : title}
      </Typography>

      <form onSubmit={handleSubmit}>

        <InputField
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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