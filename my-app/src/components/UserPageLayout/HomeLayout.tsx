import { useState } from "react";
import { Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ProductCard } from "./homepage/ProductCard";
import { Deals } from "./homepage/Deals";
import { Trending } from "./homepage/Trending";
import { AutoPlaySlider } from "../Swiper/AutoPlaySlider";

export const HomeLayout = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <Layout className="min-h-screen bg-white w-full">

      {/* ── Promo Banner ── */}
      {showBanner && (
        <div className="bg-[#e11d48] text-white text-xs text-center py-2.5 px-4 relative font-medium tracking-wide">
          🎉 Invite Friends &amp; get&nbsp;
          <strong>50% off</strong>&nbsp;on your next purchase.&nbsp;
          <a href="#" className="underline text-white font-bold hover:text-pink-100 transition-colors">
            Invite Now
          </a>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          >
            <CloseOutlined />
          </button>
        </div>
      )}

      {/* ── Hero Slider ── */}
      <div className="w-full">
        <AutoPlaySlider />
      </div>

      {/* ── Trending Now ── */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-3xl font-black text-[#0a0e27] tracking-tight m-0">
              Trending Now
            </h2>
            <span className="mb-1 text-sm text-gray-400 font-medium">— What's hot this season</span>
          </div>
          <div className="overflow-x-auto no-scrollbar pb-2">
            <ProductCard />
          </div>
        </div>
      </section>

      {/* ── Deals of the Day ── */}
      <section className="w-full py-14 bg-[#f8f8f8]">
        <Deals />
      </section>

      {/* ── Trending Offers ── */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-3xl font-black text-[#0a0e27] tracking-tight m-0">
              Brand Spotlight
            </h2>
            <span className="mb-1 text-sm text-gray-400 font-medium">— Exclusive brand offers</span>
          </div>
          <Trending />
        </div>
      </section>

    </Layout>
  );
};
