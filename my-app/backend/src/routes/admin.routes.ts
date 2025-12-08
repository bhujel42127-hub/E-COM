import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin.controller";
import { requireUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireUser,getAdmins);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/", createAdmin);

export default router;
