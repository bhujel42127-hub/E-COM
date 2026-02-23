import express from "express";
import { uploadSingleImage } from "../controllers/upload.controller";
import { upload } from "../config/cloud";
import { requireRole, requireUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/upload", requireUser, requireRole(["SUPER_ADMIN", "ADMIN"]), upload.single("file"), uploadSingleImage);

export default router;
