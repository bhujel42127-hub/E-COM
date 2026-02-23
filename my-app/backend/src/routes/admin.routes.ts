import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin.controller";
import { requireRole, requireUser } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", requireUser, requireRole(["SUPER_ADMIN"]), getAdmins);
router.put("/:id", requireUser, requireRole(["SUPER_ADMIN"]), updateAdmin);
router.delete("/:id", requireUser, requireRole(["SUPER_ADMIN"]), deleteAdmin);
router.post("/", requireUser, requireRole(["SUPER_ADMIN"]), createAdmin);

export default router;
