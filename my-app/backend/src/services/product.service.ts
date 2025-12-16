import { Product } from "../models/product.model";

class ProductService {
  async getProducts(
    userId?: string,
    search?: string,
    limit?: number,
    skip?: number
  ) {
    if (userId) {
      const product = await Product.findById(userId);
      return { product };
    }
    const searchedItem = await Product.find({
      name: { $regex: String(search), $options: "i" },
    }).limit(Number(limit));
    const [allProducts, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);
    return { allProducts, searchedItem, total };
  }
  async getProductsBySlug(slug: string) {
    const product = await Product.findOne({ slug: slug });
    return product;
  }

  async createProducts(
    name: string,
    price: number,
    size: string,
    seller: string,
    brand: string,
    color: string,
    description: string,
    slug: string,
    image: string
  ) {
    const slugExists = await Product.findOne({ slug: slug });
    if (slugExists) throw new Error("Slug already exists");
    const product = await Product.create({
      name,
      price,
      size,
      seller,
      brand,
      color,
      description,
      slug,
      imageUrl: image,
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
