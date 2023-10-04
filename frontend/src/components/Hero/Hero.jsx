import css from "./Hero.module.css"
import 'swiper/css'
import useFetch from "../../hooks/useFetch.jsx";
import HeroItem from "../HeroItem/HeroItem.jsx";
import SliderItem from "../SliderItem/SliderItem.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import GetStarted from "../GetStarted/GetStarted.jsx";
import DiscountCard from "../DiscountCard/DiscountCard.jsx";

const Hero = () => {
  const {data: categories} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/category/all`);
  const {data: discounts} = useFetch(`${import.meta.env.VITE_BACK_URL}/api/discount/all`)
  return (
      <div className={css.wrapper}>
        <div className={css.columns}>
          <div className={css.categories}>
            <ul className={css.categoriesList}>
              {categories?.data?.map((category, index) => (
                  <HeroItem key={index} name={category.name} id={index}/>
              ))}
            </ul>
          </div>
          <div className={css.mainSlider}>
            <Swiper slidesPerView={1} spaceBetween={0}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}>
              {discounts?.data?.map((discount, index) => (

                  <SwiperSlide key={index}>
                    <SliderItem image={discount.ImageModel.link} link={discount.link}/>
                  </SwiperSlide>
              ))}
            </Swiper>
            {/*demo image*/}
            {/*<img src={banner} alt=""/>*/}
          </div>
          <div className={css.info}>
            <div className={css.getStarted}>
              <GetStarted/>
              <DiscountCard/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero;