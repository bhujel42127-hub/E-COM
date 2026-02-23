import { Col, Row, Button, Rate, Tag, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useGetProductBySlug } from "../../../../hooks/useGet";
import { LeftColumn } from "./LeftColumn";
import { getAccessToken } from "../../../../utlis/handleToken";
import { useAddToCart } from "../../../../hooks/cartHook";

export interface Variant {
  color: {
    name: String;
    hex: String;
  };
  size: String;
  selected: Boolean;
}

export const ProductContent = () => {
  const { slug } = useParams();
  const { data } = useGetProductBySlug(slug as string);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [variants, setVariant] = useState<Variant>({
    color: { name: "Blue", hex: "#0000FF" },
    size: "M",
    selected: false,
  });
  const useCart = useAddToCart();
  const token = getAccessToken();

  const product = {
    name: data?.name || "Paloma",
    brandName: data?.brand,
    seller: data?.seller,
    rating: 4.4,
    reviewCount: 36,
    price: data?.price,
    originalPrice: 1000,
    sizes: Array.isArray(data?.size) ? data.size : [],
    colors: Array.isArray(data?.color) ? data.color : [],
  };

  const handleAddToCart = async (id: string) => {
    const cartData = { id, variants };
    try {
      await useCart.mutateAsync(cartData);
      message.success("Product added to cart");
    } catch (error) {
      console.log("Error adding product to cart: ", error);
    }
  };

  const discount = product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-[1400px] px-6 lg:px-10 py-6">
      <Row gutter={[48, 32]}>
        {/* Left — image gallery */}
        <>
          <LeftColumn />
        </>

        {/* Right — product info */}
        <Col xs={24} lg={12}>
          <div className="sticky top-20">

            {/* Brand */}
            <p className="text-xs font-bold uppercase tracking-widest text-[#e11d48] mb-1">
              {product.brandName}
            </p>

            {/* Name */}
            <h1 className="text-3xl font-black text-[#0a0e27] leading-tight mb-1">
              {data?.name}
            </h1>

            {/* Seller */}
            <p className="text-xs text-gray-400 mb-4">
              Sold by&nbsp;<span className="font-semibold text-gray-600">{product.seller}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <Rate
                disabled
                defaultValue={product.rating}
                allowHalf
                className="text-base text-amber-400"
              />
              <span className="text-sm font-semibold text-[#0a0e27]">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-[#0a0e27]">
                ₹{product.price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
              {discount > 0 && (
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-[#0a0e27] uppercase tracking-wide m-0">
                  Select Size
                </h4>
                <a href="#" className="text-xs text-[#e11d48] font-semibold hover:underline">
                  Size Guide
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => {
                      setVariant((prev) => ({ ...prev, size }));
                      !selectedSize ? setSelectedSize(size) : setSelectedSize("");
                    }}
                    className={`w-12 h-12 rounded-full text-sm font-semibold border-2 transition-all duration-200 cursor-pointer
                      ${selectedSize === size
                        ? "border-[#0a0e27] bg-[#0a0e27] text-white"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-[#0a0e27] uppercase tracking-wide mb-3 m-0">
                Select Color
              </h4>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: { name: string; hex: string }) => (
                  <Tag
                    key={color.hex}
                    onClick={() => {
                      setVariant((prev) => ({
                        ...prev,
                        color: { name: color.name, hex: color.hex },
                      }));
                      setSelectedColor(selectedColor === color.hex ? "" : color.hex);
                    }}
                    className={`cursor-pointer p-0 rounded-lg border-2 transition-all duration-200
                      ${selectedColor === color.hex ? "border-[#0a0e27]" : "border-gray-200 hover:border-gray-400"}`}
                  >
                    <span
                      className="block w-10 h-10 rounded-md"
                      style={{ backgroundColor: color.hex || "" }}
                    />
                  </Tag>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                className="!flex-1 !h-12 !text-sm !font-bold !bg-[#0a0e27] !border-[#0a0e27] !rounded-xl hover:!bg-[#1a2040] transition-colors"
                onClick={() => {
                  if (token) handleAddToCart(data?._id);
                  else message.error("Please log in to add to cart.");
                }}
              >
                Add to Cart
              </Button>
              <Button
                size="large"
                icon={isWishlisted ? <HeartFilled className="text-[#e11d48]" /> : <HeartOutlined />}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`!h-12 !w-12 !flex !items-center !justify-center !rounded-xl !border-2 transition-all duration-200
                  ${isWishlisted ? "!border-[#e11d48] !text-[#e11d48]" : "!border-gray-200 !text-gray-500 hover:!border-[#e11d48] hover:!text-[#e11d48]"}`}
              />
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex gap-6 text-xs text-gray-500">
              <span>🚚 Free delivery above ₹999</span>
              <span>↩ Easy 30-day returns</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
