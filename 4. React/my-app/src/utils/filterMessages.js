export const filterMessages = (messages, search) => {
  if (!search) return messages;

  const searchText = search.toLowerCase();

  return messages.filter(
    (message) =>
      message.from
        ?.toLowerCase()
        .includes(searchText) ||
      message.to
        ?.toLowerCase()
        .includes(searchText) ||
      message.text
        ?.toLowerCase()
        .includes(searchText)
  );
};