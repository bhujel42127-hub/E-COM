import { useState } from "react";
import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";
import { useGetAllProduct } from "../hooks/useGet";
import type { Product } from "../Props";

export const Women = () => {
  const { data, isLoading } = useGetAllProduct();
  const [activeTab, setActiveTab] = useState("all");

  const womenProducts = data?.products?.filter((p: Product) => p.gender?.toLowerCase() === "women" || p.gender?.toLowerCase() === "female") || [];
  
  const filteredProducts = activeTab === "all" 
    ? womenProducts 
    : womenProducts.filter((p: Product) => p.category?.toLowerCase() === activeTab);

  const categories = [
    { id: "all", label: "All Women's" },
    { id: "dresses", label: "Dresses" },
    { id: "tops", label: "Tops & Tees" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" }
  ];

  return (
    <div className="flex-1 bg-white pb-20 font-sans">
      {/* Hero Header */}
      <div className="bg-primaryLight py-16 px-4 sm:px-12 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-['Libre_Baskerville'] mb-4">
          Women's Collection
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
         Explore our premium selection of womens's clothing
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-gray-100 overflow-x-auto [scrollbar-width:none]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === cat.id 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductCard products={filteredProducts} loading={isLoading} />
      </div>
    </div>
  );
};
