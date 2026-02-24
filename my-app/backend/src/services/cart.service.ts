import { Cart } from "../models/cart.model";

class CartService {
  async cart(productData: any) {
    const cartData = productData.cartData;
    const userId = cartData.userId;
    const productId = cartData.productId;
    const variants = cartData.variants;

    // Must query nested fields individually — MongoDB can't deep-equal match objects
    const item = await Cart.findOne({
      userId,
      productId,
      "variants.size": variants.size,
      "variants.color.hex": variants.color?.hex,
    });

    if (item) {
      // Increment and return updated doc
      item.quantity += 1;
      await item.save();
      return item;
    } else {
      return await Cart.create({
        userId,
        productId,
        variants,
        quantity: 1,
      });
    }
  }

  async getCartItems(userId: string) {
    try {
      // Filter by userId — previously missing, causing all users to see all carts
      const cartItems = await Cart.find({ userId }).populate({
        path: "productId",
        select: "imageUrl price name brand slug",
      });
      return cartItems;
    } catch (error) {
      throw new Error("Error fetching cart items");
    }
  }

  async deleteCartItem(userId: string, itemId: string) {
    try {
      return await Cart.findOneAndDelete({ _id: itemId, userId });
    } catch (error) {
      throw new Error("Error deleting cart item");
    }
  }

  async updateCartItem(userId: string, itemId: string, quantity: number) {
    try {
      if (quantity < 1) throw new Error("Quantity must be at least 1");
      const updatedItem = await Cart.findOneAndUpdate(
        { _id: itemId, userId },
        { $set: { quantity } },
        { new: true }
      );
      if (!updatedItem) throw new Error("Cart item not found");
      return updatedItem;
    } catch (error) {
      throw new Error("Error updating cart item");
    }
  }
}

export const cartService = new CartService();