import { useState } from "react";
import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";
import { useGetAllProduct } from "../hooks/useGet";
import type { Product } from "../Props";

export const Kids = () => {
  const { data, isLoading } = useGetAllProduct();
  const [activeTab, setActiveTab] = useState("all");

  const kidsProducts = data?.products?.filter((p: Product) => p.gender?.toLowerCase() === "kids" || p.gender?.toLowerCase() === "child") || [];
  
  const filteredProducts = activeTab === "all" 
    ? kidsProducts 
    : kidsProducts.filter((p: Product) => p.category?.toLowerCase() === activeTab);

  const categories = [
    { id: "all", label: "All Kids'" },
    { id: "boys", label: "Boys" },
    { id: "girls", label: "Girls" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" }
  ];

  return (
    <div className="flex-1 bg-white pb-20 font-sans">
      <div className="bg-gray-50 py-16 px-4 sm:px-12 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold font-['Libre_Baskerville'] mb-4" style={{ color: "#0a0e27" }}>
          Kids' Collection
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Explore our premium selection of kids clothing
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-gray-100 overflow-x-auto [scrollbar-width:none]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={
                activeTab === cat.id
                  ? { backgroundColor: "#0a0e27", color: "#ffffff", border: "2px solid #0a0e27" }
                  : { backgroundColor: "#f9fafb", color: "#4b5563", border: "2px solid transparent" }
              }
              className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <ProductCard products={filteredProducts} loading={isLoading} />
      </div>
    </div>
  );
};