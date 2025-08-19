import { fetchAllResults } from "../services/databaseService.js";

export function getAllResults(req, res) {
  try {
    const results = fetchAllResults();
    res.json({ results });
  } catch (error) {
    console.error("Failed to fetch results: ", error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
}
