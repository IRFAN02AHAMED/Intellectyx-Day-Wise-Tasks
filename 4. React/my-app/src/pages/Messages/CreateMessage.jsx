import ChatInterface from "../../layouts/ChatInterface";
import MessageForm from "../../components/forms/MessageForm";
import useMessageStore from "../../store/zustand/useMessageStore";
import useAuthStore from "../../store/zustand/useAuthStore";

function CreateMessage() {
  const addMessage = useMessageStore((s) => s.addMessage);
  const user = useAuthStore((s) => s.user);

  const handleCreateMessage = (to, messageText) => {
    addMessage(
      user.username,
      to,
      messageText
    );
  };

  return (
    <ChatInterface>
      <MessageForm onSubmit={handleCreateMessage} />
    </ChatInterface>
  );
}

export default CreateMessage;