import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin.controller";

const router = Router();

router.get("/", getAdmins);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/", createAdmin);

export default router;
