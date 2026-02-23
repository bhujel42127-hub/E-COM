import { HeartOutlined } from "@ant-design/icons";
import { useGetAllProduct } from "../../../hooks/useGet";
import type { Product } from "../../../Props";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  /** Optional client-side filter — receives each product, return true to show it */
  filterFn?: (product: Product) => boolean;
  /** Show at most N cards (default: all) */
  limit?: number;
}

export const ProductCard = ({ filterFn, limit }: ProductCardProps) => {
  const { data, isLoading } = useGetAllProduct();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[220px] rounded-xl bg-gray-100 animate-pulse"
          >
            <div className="h-[280px] bg-gray-200 rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  let products = data?.products ?? [];
  if (filterFn) products = products.filter(filterFn);
  if (limit) products = products.slice(0, limit);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 text-sm">
        No products found in this category yet.
      </div>
    );
  }

  return (
    <div className="flex gap-5">
      {products.map((product: Product) => (
        <div
          key={product._id as string}
          className="flex-shrink-0 w-[220px] cursor-pointer group"
          onClick={() => navigate(`/products/${product.slug}`)}
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-[3/4]">
            <img
              alt={product.name as string}
              src={product.imageUrl}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-[#e11d48] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Sale
            </div>
            <button
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-[#e11d48]"
              onClick={(e) => e.stopPropagation()}
            >
              <HeartOutlined className="text-sm" />
            </button>
          </div>

          {/* Info */}
          <div className="pt-3 pb-1 px-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-[#0a0e27] leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-[#0a0e27]">
                ₹{product.price as number}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{Math.round((product.price as number) * 1.3)}
              </span>
              <span className="text-xs font-bold text-emerald-600">23% off</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
