import type { Request, Response } from "express";
import { cartService } from "../services/cart.service";

export async function addTocart(req: Request, res: Response) {
  const userId = req.userId;
  const productData = req.body.cartData;

  const { id, variants } = productData;

  // Backend guard — reject if size or color is missing
  if (!variants?.size || !variants?.color?.hex) {
    return res.status(400).json({
      message: "Please select a size and color before adding to cart",
      success: false,
    });
  }

  const cartData = {
    userId,
    productId: id,
    variants,
  };

  const cart = await cartService.cart({ cartData, userId });
  res.json({ message: "Product added to cart", success: true, cart });
}

export async function getCartItems(req: Request, res: Response) {
  const userId = req.userId;
  const cartItems = await cartService.getCartItems(userId);
  res.json({
    message: "Cart items fetched successfully",
    success: true,
    cartItems,
  });
}

export async function deleteCartItem(req: Request, res: Response) {
  const userId = (req as any).userId as string;
  const itemId = req.params.id;
  if (!itemId) throw Error("Item id is required");
  await cartService.deleteCartItem(userId, itemId);
  res.json({ message: "Cart item deleted successfully", success: true });
}

export async function updateCartItem(req: Request, res: Response) {
  try {
    const userId = (req as any).userId as string;
    const itemId = req.params.id;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: "Quantity is required", success: false });
    }

    const updatedItem = await cartService.updateCartItem(userId, itemId, quantity);
    res.json({ message: "Cart item updated successfully", success: true, item: updatedItem });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to update cart item", success: false });
  }
}