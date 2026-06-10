import ChatInterface from "../layouts/ChatInterface";
import MessageForm from "../components/forms/MessageForm";
import useMessageStore from "../store/useMessageStore";

function CreateMessage() {
  const addMessage = useMessageStore((s) => s.addMessage);

  return (
    <ChatInterface>
      <MessageForm onSubmit={addMessage} />
    </ChatInterface>
  );
}

export default CreateMessage;