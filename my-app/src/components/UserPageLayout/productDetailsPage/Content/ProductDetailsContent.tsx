import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Rate, Tag, message, Divider } from "antd";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useGetProductBySlug } from "../../../../hooks/useGet";
import { getAccessToken } from "../../../../utlis/handleToken";
import { useAddToCart } from "../../../../hooks/cartHook";

export const ProductContent = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetProductBySlug(slug as string);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const useCart = useAddToCart();
  const token = getAccessToken();

  const product = {
    name: data?.name || "",
    brand: data?.brand || "",
    seller: data?.seller || "",
    price: data?.price || 0,
    originalPrice: data?.price ? Math.round(data.price * 1.25) : 0,
    images: data?.imageUrl ? [data.imageUrl] : [],
    sizes: Array.isArray(data?.size) ? data.size : [],
    colors: Array.isArray(data?.color) ? data.color : [],
    description: data?.description || "",
  };


  const handleAddToCart = async () => {
    if (!token) {
      message.error("Please log in to add items to cart");
      return;
    }

    // Hard stop — do NOT fall back silently
    const needsSize = product.sizes.length > 0 && !selectedSize;
    const needsColor = product.colors.length > 0 && !selectedColor;

    setSizeError(needsSize);
    setColorError(needsColor);

    if (needsSize || needsColor) {
      message.warning("Please select all required options before adding to cart");
      return; // <-- actually stops here, no mutateAsync called
    }

    try {
      await useCart.mutateAsync({
        id: data?._id,
        variants: {
          color: selectedColor,
          size: selectedSize,
          selected: true,
        },
      });
      message.success("Added to cart!");
    } catch {
      message.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-12 py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-2xl aspect-square" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded w-3/4" />
            <div className="h-5 bg-gray-100 rounded w-1/3" />
            <div className="h-10 bg-gray-100 rounded w-1/2" />
            <div className="h-24 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Images */}
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="flex flex-col gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-gray-900" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
              {product.images[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-300 text-sm">No image</div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-5">

            {/* Brand & Name */}
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-1">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 font-['Libre_Baskerville'] leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Sold by {product.seller}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Rate disabled defaultValue={4.5} allowHalf className="text-sm" />
              <span className="text-sm text-gray-500">4.5 · 36 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                ${product.price}
              </span>
            </div>

            <Divider className="my-0" />

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <p className={`text-sm font-semibold mb-3 ${sizeError ? "text-red-500" : "text-gray-700"}`}>
                  Size
                  {selectedSize
                    ? <span className="ml-2 font-normal text-gray-400">— {selectedSize}</span>
                    : sizeError && <span className="ml-2 font-normal">— please select a size</span>
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size === selectedSize ? "" : size);
                        setSizeError(false);
                      }}
                      className={`w-11 h-11 rounded-lg text-sm font-semibold border-2 transition-all ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : sizeError
                          ? "border-red-300 text-gray-600 hover:border-red-400"
                          : "border-gray-200 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <p className={`text-sm font-semibold mb-3 ${colorError ? "text-red-500" : "text-gray-700"}`}>
                  Color
                  {selectedColor
                    ? <span className="ml-2 font-normal text-gray-400">— {selectedColor.name}</span>
                    : colorError && <span className="ml-2 font-normal">— please select a color</span>
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: any) => (
                    <button
                      key={color.hex}
                      onClick={() => {
                        setSelectedColor(selectedColor?.hex === color.hex ? null : color);
                        setColorError(false);
                      }}
                      title={color.name}
                      className={`w-9 h-9 rounded-full transition-all ${
                        selectedColor?.hex === color.hex
                          ? "border-4 border-gray-900 scale-110"
                          : colorError
                          ? "border-4 border-red-300 hover:scale-105"
                          : "border-4 border-white shadow-md hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                loading={useCart.isPending}
                onClick={handleAddToCart}
                className="!h-12 !flex-1 !rounded-xl !bg-gray-900 !border-gray-900 !font-semibold !text-base hover:!bg-gray-700"
              >
                Add to Cart
              </Button>
              <Button
                size="large"
                onClick={() => setIsWishlisted(!isWishlisted)}
                icon={isWishlisted ? <HeartFilled className="!text-red-500" /> : <HeartOutlined />}
                className="!h-12 !w-12 !rounded-xl !border-gray-200 flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};