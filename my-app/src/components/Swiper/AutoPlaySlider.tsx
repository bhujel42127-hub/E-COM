import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

import { Pagination } from "swiper/modules";

import sliderimg1 from "../../assets/5691814.jpg"

const slides = [
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
    {
        img: sliderimg1,
    },
];

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
        className="mySwiper"
      >
        {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <img src={slide.img} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}
