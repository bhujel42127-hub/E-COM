import { Cart } from "../models/cart.model";

class CartService {
  async cart(productData: any) {
    const item = await Cart.findOne({
      productId: productData.productId,
      userId: productData.userId,
    });
    if (item) {
      item.quantity += productData.quantity || 1;
      await item.save();
    } else {
      const product = await Cart.create(productData);
      return product;
    }
  }

  async getCartItems(userId: string) {
    try {
      const cartItems = await Cart.find()
        .populate("productId")
        .where({ userId: userId });
      return cartItems;
    } catch (error) {
      throw new Error("Error fetching cart items");
    }
  }
  async deleteCartItem(userId: string, itemId: string) {
    try {
      return await Cart.deleteOne({ productId: itemId, userId: userId });
    } catch (error) {
      throw new Error("Error deleting cart item");
    }
  }
}

export const cartService = new CartService();
