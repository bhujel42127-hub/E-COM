import { Product } from "../models/product.model";
import { slugify } from "../slugify";

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
  
  async createProducts(data: any) {
    const slugExists = await Product.findOne({ slug: data.slug });
    if (slugExists) throw new Error("Slug already exists");
    const { name, price, size, seller, brand, color, description, slug, image } = data;
    const formattedSlug = slugify(slug);
    console.log("Product slug:", formattedSlug)
    const product = await Product.create({
      name,
      price,
      size,
      seller,
      brand,
      color: color.map((c: any) => ({ name: c.label, hex: c.value })),
      description,
      slug: formattedSlug,
      imageUrl: image,
    });
    console.log("Created product: ", product);
    return { product };
  }
  async updateProduct(id: string, data: any) {
    const formattedSlug = slugify(data.slug);

    return await Product.findByIdAndUpdate({ _id: id }, {...data, slug: formattedSlug}, {
      new: true,
    });
  }
  async deleteProduct(id: string) {
    console.log("in product delete service");
    return await Product.findByIdAndDelete({ _id: id });
  }
}

export const productService = new ProductService();
