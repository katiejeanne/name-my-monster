app.post("/api/name-monster", (req, res) => {
  const { description } = req.body;
  console.log("Received monster description: ", description);

  res.json({
    names: {
      openai: "Grizzlebeak",
      claude: "Snorfle",
      mistral: "Vexclaw",
    },
  });
});
