import express from "express";
import { addTocart, deleteCartItem, getCartItems } from "../controllers/cart.controller";
import { requireUser } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", requireUser, addTocart);
router.get("/", requireUser, getCartItems);
router.delete("/:id", requireUser, deleteCartItem);

export default router;
