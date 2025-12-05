import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin.controller";

const router = Router();

router.get("/admins", getAdmins);
router.put("/admins/:id", updateAdmin);
router.delete("/admins/:id", deleteAdmin);
router.post("/admins", createAdmin);

export default router;
