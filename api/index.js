import express from "express";
import nameMonsterRoutes from "./nameMonsterRoutes.js";
import allResults from "./allResults.js";

const router = express.Router();

router.use("/allResults", allResults);
router.use("/name-monster", nameMonsterRoutes);

export default router;
