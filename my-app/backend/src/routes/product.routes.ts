import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProducts,
  getProductsBySlug,
  updateProduct,
} from "../controllers/product.controller";
import { requireUser } from "../middlewares/auth.middleware";

const router = Router();

// router.get("/", requireUser, getProducts);
// router.post("/", requireUser, createProducts);
// router.put("/:id", requireUser, updateProduct);
// router.delete("/:id", requireUser, deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProducts);
router.get("/slug/:slug", getProductsBySlug);
router.post("/", createProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
