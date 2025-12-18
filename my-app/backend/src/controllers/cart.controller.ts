import type { Request, Response } from "express";
import { cartService } from "../services/cart.service";

export async function cart (req: Request, res: Response) {
    const product = req.body;
    console.log("Add to cart product: ", product)
    const cartData = await cartService.cart(product);
    console.log("Product in cart:", cartData);
    res.json({message: "Product added to cart:", success: true, cartData})
}