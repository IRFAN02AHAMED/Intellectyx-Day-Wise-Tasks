const API_URL =
  "https://fake-json-api.mock.beeceptor.com/companies";

export async function getCompanies() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return response.json();
}