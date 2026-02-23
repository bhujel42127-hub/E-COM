import { ProductCard } from "../components/UserPageLayout/homepage/ProductCard";
import type { Product } from "../Props";

const sections = [
  { title: "Shoes", key: "shoes" },
  { title: "T-Shirts", key: "t-shirt" },
  { title: "Dresses", key: "dress" },
];

export const Women = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Category Hero ── */}
      <div className="bg-[#1a0a1a] text-white py-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
            Home / Women
          </p>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Women's Collection
          </h1>
          <p className="text-gray-400 text-sm">
            Discover the season's most coveted styles for women.
          </p>
        </div>
      </div>

      {/* ── Product Sections ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 space-y-14">
        {sections.map((section) => (
          <section key={section.key}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#0a0e27] m-0">
                  {section.title}
                </h2>
                <div className="h-0.5 w-12 bg-[#e11d48] mt-1.5 rounded-full" />
              </div>
              <a
                href="#"
                className="text-xs font-bold uppercase tracking-wider text-[#e11d48] hover:underline"
              >
                View All →
              </a>
            </div>

            <div className="overflow-x-auto no-scrollbar pb-2">
              <ProductCard
                filterFn={(p: Product) =>
                  p.seller?.toLowerCase().includes("women") ||
                  p.brand?.toLowerCase().includes("women") ||
                  true /* show all until backend has category field */
                }
                limit={8}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
