import { Product } from "../models/product.model";

class ProductService {
  async getProducts(
    userId: string,
    search: string,
    limit: number,
    skip: number
  ) {
    const searchedItem = await Product.find({
      name: { $regex: String(search), $options: "i" },
    }).limit(Number(limit));

    const [allProducts, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    return { userId, allProducts, searchedItem, total };
  }
  async createProducts(
    name: string,
    price: number,
    size: string,
    seller: string,
    brand: string,
    color: string
  ) {
    const product = await Product.create({
      name,
      price,
      size,
      seller,
    });
    return { product };
  }
  async updateProduct(id: string, data: any) {
    return await Product.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  }
  async deleteProduct(id: string) {
    console.log("in product delete service");
    return await Product.findByIdAndDelete({ _id: id });
  }
}

export const productService = new ProductService();
