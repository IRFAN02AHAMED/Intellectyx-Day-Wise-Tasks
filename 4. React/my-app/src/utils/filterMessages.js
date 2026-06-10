export function filterMessages(
  messages,
  search
) {
  return messages.filter(
    (message) =>
      message.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      message.text
        .toLowerCase()
        .includes(search.toLowerCase())
  );
}