import express from "express";
import db from "./config/db.js";
import apiRoutes from "./api/index.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
