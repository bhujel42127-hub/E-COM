import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Cart = mongoose.model("Cart", cartSchema);
