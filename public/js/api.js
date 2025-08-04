export async function nameMonster(description) {
  const response = await fetch("/api/name-monster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  return response.json();
}

export async function getAllResults() {
  const response = await fetch("/api/allResults");
  return response.json();
}
