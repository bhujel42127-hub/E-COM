import type { Request, Response } from "express";
import { productService } from "../services/product.service";

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await productService.getProducts();
    res.json({ products });
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
}
