import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
import { deleteAnalysis, downloadAnalyis, getAnalysis, getHistory, uploadAndAnalyze } from "../controllers/resume.controllers.js";

let router = express.Router();

router.use(authMiddleware);

router.post("/analyze", upload.single("resume"), uploadAndAnalyze);
router.get("/getHistory", getHistory);
router.delete("/:id", deleteAnalysis);
router.get("/:id", getAnalysis);
router.get("/download/:id", authMiddleware, downloadAnalyis);

export default router;