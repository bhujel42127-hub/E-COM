import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, default: 1, min: 1, required: true },
  variants: {
    color: {
      name: {type: String, required: true},
      hex: {type: String, required: true},
    },
    size: {
      type: String,
      required: true,
    },
  },
  isSelected: Boolean
});
cartSchema.index({ userId: 1, productId: 1, variants: 1 }, { unique: true });
export const Cart = mongoose.model("Cart", cartSchema);
