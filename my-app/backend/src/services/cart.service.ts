import { Cart } from "../models/cart.model";

class CartService {
  async cart(productData: any) {
    // console.log("Product data: ", productData.cartData);
    const cartData = productData.cartData;
    const userId = cartData.userId;
    const productId = cartData.productId;
    const variants = cartData.variants;

    // console.log("Product variant: ", variants);


    const item = await Cart.findOne(
      {userId, productId, variants},
    );
    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      const product = await Cart.create({userId, productId, variants, quantity: 1});
      return product;
    }
  }

  async getCartItems(userId: string) {
    try {
      const cartItems = await Cart.find().populate({
        path: "productId",
        select: "imageUrl price name"
      })
      console.log("Cart Items in getCartItems:", cartItems);
      return cartItems;
    } catch (error) {
      throw new Error("Error fetching cart items");
    }
  }
  async deleteCartItem(userId: string, itemId: string) {
    try {
      return await Cart.findByIdAndDelete({ _id: itemId, userId: userId });
    } catch (error) {
      throw new Error("Error deleting cart item");
    }
  }

  async updateCartItem(userId: string, itemId: string, quantity: number) {
    try {
      if (quantity < 1) throw new Error("Quantity must be at least 1");
      const updatedItem = await Cart.findOneAndUpdate(
        { _id: itemId, userId: userId },
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
