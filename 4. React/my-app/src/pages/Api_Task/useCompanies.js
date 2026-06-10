import { useEffect, useState } from "react";

export function useCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "https://fake-json-api.mock.beeceptor.com/companies"
        );

        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, setCompanies };
}