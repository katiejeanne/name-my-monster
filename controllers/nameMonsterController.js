export function handleNameMonster(req, res) {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Missing description" });
  }

  console.log("Received monster description: ", description);

  res.json({
    names: {
      openai: "Grizzlebeak",
      claude: "Snorfle",
      mistral: "Vexclaw",
    },
  });
}
