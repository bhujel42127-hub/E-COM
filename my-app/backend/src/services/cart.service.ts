import { Cart } from "../models/cart.model";

class CartService {
    async cart(productData: any) {
        const product = await Cart.create(productData)
        return product;
    }
}

export const cartService = new CartService();