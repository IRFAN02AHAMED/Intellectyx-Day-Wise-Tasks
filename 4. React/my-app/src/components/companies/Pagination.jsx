function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  return (
    <div style={{ marginTop: "10px" }}>
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        Prev
      </button>

      <span
        style={{ margin: "0 10px" }}
      >
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;