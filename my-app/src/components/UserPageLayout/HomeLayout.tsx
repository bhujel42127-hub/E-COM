import { Layout } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { ProductCard } from "./homepage/ProductCard";
import { Deals } from "./homepage/Deals";
import { Trending } from "./homepage/Trending";
import { AutoPlaySlider } from "../Swiper/AutoPlaySlider";

export const HomeLayout = () => {
  return (
    <Layout className="min-h-screen bg-white w-full font-['Libre_Baskerville']">
      {/* Invite friends banner */}
      <div className="bg-primaryLight py-2.5 text-center">
        <div className="relative mx-auto px-4 sm:px-12">
          <span>Invite Friends and get 50% off on your next purchase </span>
          <a href="#" className="text-accent ml-2.5">
            Invite Now
          </a>
          <CloseOutlined className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 cursor-pointer" />
        </div>
      </div>

      {/* Slider */}
      <div className="flex w-full">
        <AutoPlaySlider />
      </div>

      {/* Trending Now */}
      <div className="w-full py-12">
        <h2 className="text-3xl font-bold mb-8 px-4 sm:px-12">Trending Now</h2>
        <div className="mx-auto px-4 sm:px-12 overflow-x-auto [scrollbar-width:none]">
          <ProductCard />
        </div>
      </div>

      {/* Deals of the Day */}
      <div className="w-full py-12 bg-primaryLight">
        <Deals />
      </div>

      {/* Trending Offers */}
      <div className="w-full py-12">
        <Trending />
      </div>
    </Layout>
  );
};
