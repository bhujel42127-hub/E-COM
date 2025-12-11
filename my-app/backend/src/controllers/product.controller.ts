import type { Request, Response } from "express";
import { productService } from "../services/product.service";

// export async function getProducts(req: Request, res: Response) {
//   try {
//     const products = await productService.getProducts();
//     res.json({ products });
//   } catch (error) {
//     console.log("Error fetching products: ", error);
//   }
// }
export async function createProducts(req: Request, res: Response) {
  try {
    const { name, price, size, seller, brand, color, description, slug } = req.body;
    const { product } = await productService.createProducts(
      name,
      price,
      size,
      seller,
      brand,
      color,
      description,
      slug
    );
    res.json({ product });
  } catch (error) {
    res.status(409).json({
      message: "Slug already exists!!",
    });
    console.log("Error creating products: ", error);
  }
}
export async function getProducts(req: Request, res: Response) {
  console.log("calling get all products");
  const userId = (req as any).userId;
  const { search = "", limit = 10, page } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const products = await productService.getProducts(
    userId,
    search.toString(),
    Number(limit),
    skip
  );
  res.json({
    // searchedProducts: products.searchedItem,
    products: products.allProducts,
    page,
    limit,
    skip,
    total: products.total,
  });
}
export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await productService.updateProduct(id as string, req.body);
    res.json({ message: "Product updated" });
  } catch (error) {
    console.log("Error creating products: ", error);
  }
}
export async function deleteProduct(req: Request, res: Response) {
  console.log("in product delete controller");
  const { id } = req.params;
  try {
    await productService.deleteProduct(id as string);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.log("Error creating products: ", error);
  }
}
