import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, deleteCompany } from "../../store/redux/companiesSlice";
import {
  ITEMS_PER_PAGE,
} from "../../utils/constants";
import Pagination from "./Pagination";
import CompanyRow from "./CompanyRow";

function CompaniesTable() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.companies);

  const [page, setPage] = useState(1);
  

  // useEffect(() => {
  //   dispatch(fetchCompanies());
  // }, [dispatch]);

  useEffect(() => {
  if (data.length === 0) {
    dispatch(fetchCompanies());
  }
}, [dispatch]);


  // pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedData =
  data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
  data.length / ITEMS_PER_PAGE
);

  const handleDelete = (id) => {
    dispatch(deleteCompany(id));
  };

  if (loading)
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        fontSize: "30px",
        fontWeight: "bold",
        color: "green"
      }}
    >
      Loading...
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        textAlign: "center",
        padding: "40px 20px", 
      }}
    >

      <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "900px",
      }}
    >
      <h1>Companies List</h1>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>CEO</th>
            <th>Industry</th>
            <th>Country</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
  {paginatedData.map((company) => (
    <CompanyRow
      key={company.id}
      company={company}
      onDelete={handleDelete}
    />
  ))}
</tbody>
      </table>
  <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
      
    </div>
    </div>
  );
}

export default CompaniesTable;