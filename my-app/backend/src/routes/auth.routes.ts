import { Router } from "express";
import {
  getUser,
  login,
  logout,
  refresh,
  signup,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/getUser", getUser);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
