import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import HeroSlide from "../Shared/HeroSlide";
import SectionWrapperLarge from "../Shared/SectionWrapperLarge";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/RSWTvvG/banner.png",
    title: `Welcome To First Choice`,
    moto: "Make yourself more than fashionable",
    btn_text: "All Product",
    path: "/products",
  },
  {
    id: 2,
    image: "https://i.ibb.co/7kF7031/banner-02.png",
    title: "Make Value",
    moto: "Get Gorgeous For Cheap",
    btn_text: "All Product",
    path: "/products",
  },
];
const HeroSlider = () => {
  return (
    <>
      <SectionWrapperLarge>
        <Swiper
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          effect="fade"
          modules={[Navigation, Autoplay, Pagination, EffectFade]}
          pagination={{ clickable: true }}
          className="mySwiper hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {({ isActive }) => isActive && <HeroSlide slide={slide} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </SectionWrapperLarge>
    </>
  );
};

export default HeroSlider;
