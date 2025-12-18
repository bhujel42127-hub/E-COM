import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, default: 1, min: 1, required: true },
});
cartSchema.index({userId: 1, productId: 1}, {unique: true});
export const Cart = mongoose.model("Cart", cartSchema);
