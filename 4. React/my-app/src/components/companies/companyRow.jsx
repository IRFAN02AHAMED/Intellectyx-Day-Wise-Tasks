import React from "react";

function CompanyRow({ company, onDelete }) {
  console.log("Rendering:", company.name);

  return (
    <tr>
      <td>{company.id}</td>
      <td>{company.name}</td>
      <td>{company.ceoName}</td>
      <td>{company.industry}</td>
      <td>{company.country}</td>
      <td>
        <button onClick={() => onDelete(company.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default React.memo(CompanyRow);