import express from "express";
import nameMonsterRoutes from "./nameMonsterRoutes.js";

const router = express.Router();

router.use("/name-monster", nameMonsterRoutes);

export default router;
