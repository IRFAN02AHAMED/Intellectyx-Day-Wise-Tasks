import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useCompanies } from "./useCompanies";
import CompanyRow from "./CompanyRow";

function CompaniesTable() {
  const { companies, setCompanies } = useCompanies();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleDelete = useCallback((id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  }, [setCompanies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [companies, search]);
console.log("hello")
  console.log(companies);

 return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      backgroundColor: "#f4f6f8", // light grey background
      paddingTop: "40px",
    }}
  >
    {/* WHITE CONTAINER */}
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        minWidth: "700px",
        textAlign: "center",
      }}
    >
      <h1>Companies List</h1>

      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Company"
        style={{
          padding: "8px",
          width: "60%",
          marginBottom: "15px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
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
  </div>
);
}

export default CompaniesTable;