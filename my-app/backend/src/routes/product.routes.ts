import { Router } from "express";
import {
  createProducts,
  deleteProduct,
  getProducts,
  getProductsBySlug,
  updateProduct,
} from "../controllers/product.controller";
import { requireRole, requireUser } from "../middlewares/auth.middleware";

const router = Router();

// router.get("/", requireUser, getProducts);
// router.post("/", requireUser, createProducts);
// router.put("/:id", requireUser, updateProduct);
// router.delete("/:id", requireUser, deleteProduct);

router.get("/", getProducts);
router.get("/:id", getProducts);
router.get("/slug/:slug", getProductsBySlug);
router.post("/", requireUser, requireRole(["SUPER_ADMIN", "ADMIN"]), createProducts);
router.put("/:id", requireUser, requireRole(["SUPER_ADMIN", "ADMIN"]), updateProduct);
router.delete("/:id", requireUser, requireRole(["SUPER_ADMIN", "ADMIN"]), deleteProduct);

export default router;
