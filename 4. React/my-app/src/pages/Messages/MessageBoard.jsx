// import ChatInterface from "../layouts/ChatInterface";

// import MessageForm from "../components/forms/MessageForm";
// import SearchSort from "../components/messages/SearchSort";
// import MessageCard from "../components/messages/MessageCard";

// import useMessages from "../hooks/useMessages";
// import useSearch from "../hooks/useSearch";

// import { filterMessages } from "../utils/filterMessages";
// import { sortMessages } from "../utils/sortMessage";

// function MessageBoard() {
//   const {
//     messages,
//     addMessage,
//     likeMessage,
//     addReply,
//   } = useMessages();

//   const {
//     search,
//     setSearch,
//     sort,
//     setSort,
//   } = useSearch();

//   const filteredMessages = filterMessages(messages, search);
//   const sortedMessages = sortMessages(filteredMessages, sort);

//   return (
//     <ChatInterface>

//       {/* CREATE MESSAGE */}
//       <MessageForm onSubmit={addMessage} />

//       {/* SEARCH + SORT */}
//       <SearchSort
//         search={search}
//         setSearch={setSearch}
//         sort={sort}
//         setSort={setSort}
//       />

//       {sortedMessages.map((message) => (
//         <MessageCard
//           key={message.id}
//           message={message}
//           onLike={likeMessage}
//           onReply={addReply}
//         />
//       ))}

//     </ChatInterface>
//   );
// }

// export default MessageBoard;