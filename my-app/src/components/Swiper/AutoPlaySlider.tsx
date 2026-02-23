import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

import { Pagination } from "swiper/modules";

export function AutoPlaySlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20,
        //   },
        //   768: {
        //     slidesPerView: 4,
        //     spaceBetween: 40,
        //   },
        //   1024: {
        //     slidesPerView: 5,
        //     spaceBetween: 50,
        //   },
        // }}
        modules={[Pagination]}
        className="mySwiper h-[300px] md:h-[500px] lg:h-[700px] w-full"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <SwiperSlide
            key={i}
            className="flex justify-center items-center text-center text-lg bg-[#444]"
          >
            Slide {i}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
