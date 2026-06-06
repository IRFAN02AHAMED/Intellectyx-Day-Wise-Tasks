function ReplyList({ replies }) {
  return (
    <div className="replies">
      {replies.map((reply, index) => (
        <div
          key={index}
          className="reply"
        >
          <strong>
            {reply.name}
          </strong>

          <br />

          {reply.text}
        </div>
      ))}
    </div>
  );
}

export default ReplyList;