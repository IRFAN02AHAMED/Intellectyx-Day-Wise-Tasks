export function sortMessages(
  messages,
  sort
) {
  const sorted = [...messages];

  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) => a.id - b.id
      );

    case "name":
      return sorted.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

    default:
      return sorted.sort(
        (a, b) => b.id - a.id
      );
  }
}