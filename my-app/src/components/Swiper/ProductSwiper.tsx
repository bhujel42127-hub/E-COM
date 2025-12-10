import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "../ProductCard";

export const ProductSwiper = () => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView={4}
      style={{ padding: "0 20px 40px" }}
    >
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <SwiperSlide key={item}>
          <ProductCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
