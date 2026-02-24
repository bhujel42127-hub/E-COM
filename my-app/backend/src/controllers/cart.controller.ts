import type { Request, Response } from "express";
import { cartService } from "../services/cart.service";

export async function addTocart(req: Request, res: Response) {
  //   console.log("User id:", req.userId);
  //   console.log("Add to cart request body: ", req.body);
  const userId = req.userId;
  const productData = req.body.cartData;
  
  const cartData = {
    userId: userId,
    productId: productData.id,
    variants: productData.variants
  }
  
  console.log("Cart data:", cartData);
  const cart = await cartService.cart({cartData, userId});
  console.log("Product in cart:", cartData);
  res.json({ message: "Product added to cart:", success: true, cart });
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
  console.log("Product Id:", itemId);
  await cartService.deleteCartItem(userId, itemId);
  res.json({ message: "Cart items deleted successfully", success: true });
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
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: error.message || "Failed to update cart item", success: false });
  }
}
