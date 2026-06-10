import Typography from "../typography/Typography";

import InputField from "../ui/InputField";

import SelectField from "../ui/SelectField";


function SearchSort({
  search,
  setSearch,
  sort,
  setSort
}) {
  return (
  <div className="search-sort">
    <div className="search-section">
      <Typography variant="h3">
        Search
      </Typography>
    
      <InputField
        placeholder="Search posts..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>

    <div className="sort-section">
      <Typography variant="h3">
        Sort
      </Typography>

      <SelectField
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        options={[
          {
            value: "newest",
            label: "Newest First",
          },
          {
            value: "oldest",
            label: "Oldest First",
          },
          {
            value: "name",
            label: "Name (A-Z)",
          },
        ]}
      />
    </div>
  </div>
);
}

export default SearchSort;