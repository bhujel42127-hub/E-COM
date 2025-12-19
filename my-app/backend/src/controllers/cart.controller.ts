import type { Request, Response } from "express";
import { cartService } from "../services/cart.service";

export async function addTocart(req: Request, res: Response) {
  //   console.log("User id:", req.userId);
  //   console.log("Add to cart request body: ", req.body);
  const userId = req.userId;
  const productId = req.body.id;
  console.log("Product id:", productId);
  const cartData = await cartService.cart({userId, productId});
  console.log("Product in cart:", cartData);
  res.json({ message: "Product added to cart:", success: true, cartData });
}

export async function getCartItems(req: Request, res: Response) {
  const userId = req.userId;
  const cartItems = await cartService.getCartItems(userId);
  res.json({ message: "Cart items fetched successfully", success: true, cartItems });
}

export async function deleteCartItem(req: Request, res: Response) {
  const userId = req.userId;
  const itemId = req.params.id;
  console.log("Product Id:", itemId)
  await cartService.deleteCartItem(userId, itemId);
  res.json({ message: "Cart items deleted successfully", success: true });
}
