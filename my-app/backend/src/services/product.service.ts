import { Product } from "../models/product.model";

class ProductService {
  async getProducts() {
    return await Product.find();
  }
}

export const productService = new ProductService();
