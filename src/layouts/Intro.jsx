import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import assets from '../assets';

export const Intro = ({ onProductTypeChange }) => {
  // Slider harakatiga qarab mahsulot turini yangilash
  const handleSlideChange = (swiper) => {
    const slideIndex = swiper.activeIndex;
    if (slideIndex === 0) onProductTypeChange('elfbar');
    else if (slideIndex === 1) onProductTypeChange('elflio');
    else if (slideIndex === 2) onProductTypeChange('discount');
  };

  return (
    <div className='intro'>
      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg1} alt='Elfbar Slide' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg2} alt='Elflio Slide' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg3} alt='Discount Slide' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
