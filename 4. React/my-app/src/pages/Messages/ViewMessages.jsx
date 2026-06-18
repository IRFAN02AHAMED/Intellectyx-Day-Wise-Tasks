import ChatInterface from "../../layouts/ChatInterface";
import { useMemo } from "react";

import SearchSort from "../../components/messages/SearchSort";
import MessageCard from "../../components/messages/MessageCard";

import useMessageStore from "../../store/zustand/useMessageStore";
import useSearch from "../../hooks/useSearch";

import { filterMessages } from "../../utils/filterMessages";
import { sortMessages } from "../../utils/sortMessage";

function ViewMessages() {
  const messages = useMessageStore((s) => s.messages);
  const likeMessage = useMessageStore((s) => s.likeMessage);
  const addReply = useMessageStore((s) => s.addReply);

  const { search, setSearch, sort, setSort } = useSearch();

  const sortedMessages = useMemo(() => {
    const filtered = filterMessages(messages, search);
    return sortMessages(filtered, sort);
  }, [messages, search, sort]);


  console.log(messages);

  return (
    <ChatInterface>
      <SearchSort
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {sortedMessages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onLike={likeMessage}
          onReply={addReply}
        />
      ))}
    </ChatInterface>
  );
}

export default ViewMessages;