import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "../routes/Slide";
import bgimg1 from "../assets/images/pexels-holfotos-3115525.jpg";
import bgimg2 from "../assets/images/pexels-puwadon-sang-ngern-2168173-5340276.jpg";
import bgimg3 from "../assets/images/pexels-roberto-carrafa-2159534-3908179.jpg";
const Carousel = () => {
  return (
    <div className=" pb-2 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            image={bgimg1}
            text="The marathon is a long-distance foot race with"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg2}
            text="A creation of the French philologist Michel Bréal inspired by a story from Ancient"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bgimg3}
            text="The name Marathon comes from the legend of Pheidippides"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
