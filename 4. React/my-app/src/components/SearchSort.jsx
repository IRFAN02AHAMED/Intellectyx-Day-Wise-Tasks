function SearchSort({
  search,
  setSearch,
  sort,
  setSort
}) {
  return (
  <div className="search-sort">
    <div className="search-section">
      <h3>Search</h3>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="sort-section">
      <h3>Sort</h3>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="name">Name (A-Z)</option>
      </select>
    </div>
  </div>
);
}

export default SearchSort;