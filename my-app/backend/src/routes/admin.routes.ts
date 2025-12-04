import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/admin.controller";

const router = Router();

router.get("/getAdmins", getAdmins);
router.put("/updateAdmin/:id", updateAdmin);
router.delete("/deleteAdmin/:id", deleteAdmin);
router.post("/createAdmin", createAdmin);

export default router;
