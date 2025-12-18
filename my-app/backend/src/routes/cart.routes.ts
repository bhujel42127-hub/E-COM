import express from "express";
import { cart } from "../controllers/cart.controller";

const router = express.Router();

router.post("/", cart);

export default router;
