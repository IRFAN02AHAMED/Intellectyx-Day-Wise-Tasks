export function sortMessages(messages, sort) {

  console.log("SORTING:", sort);
  const sorted = [...messages];

  switch (sort) {
    case "name":
  return sorted.sort((a, b) =>
    a.from.localeCompare(b.from)
  );

case "to":
  return sorted.sort((a, b) =>
    a.to.localeCompare(b.to)
  );

case "likes":
  return sorted.sort((a, b) =>
    b.likes - a.likes
  );

case "oldest":
  return sorted.sort((a, b) =>
    a.createdAt - b.createdAt
  );

default:
  return sorted.sort((a, b) =>
    b.createdAt - a.createdAt
  );
  }
}