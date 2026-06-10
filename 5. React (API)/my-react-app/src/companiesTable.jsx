import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";

import { useCompanies } from "./useCompanies";
import CompanyRow from "./CompanyRow";

function CompaniesTable() {
  const { companies, setCompanies } = useCompanies();

  const [search, setSearch] = useState("");

  const inputRef = useRef(null);

  // useRef + useEffect
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // useCallback
  const handleDelete = useCallback(
    (id) => {
      setCompanies((prevCompanies) =>
        prevCompanies.filter(
          (company) => company.id !== id
        )
      );
    },
    [setCompanies]
  );

  // useMemo
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [companies, search]);

  return (
    <div>
      <h1>Companies List</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search Company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>CEO Name</th>
            <th>Industry</th>
            <th>Country</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesTable;