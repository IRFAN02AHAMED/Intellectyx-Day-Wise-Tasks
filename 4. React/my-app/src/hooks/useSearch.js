import { useState } from "react";

function useSearch() {
  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  return {
    search,
    setSearch,
    sort,
    setSort,
  };
}

export default useSearch;