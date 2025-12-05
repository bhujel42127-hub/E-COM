import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    size: String,
    seller: String,
    brand: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
