import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import assets from '../assets';

export const WinIntro = ({ onProductTypeChange }) => {
  // Slider harakatiga qarab mahsulot turini yangilash
  const handleSlideChange = (swiper) => {
    const slideIndex = swiper.activeIndex;
    if (slideIndex === 0) onProductTypeChange('elfbar');
    else if (slideIndex === 1) onProductTypeChange('elflio');
    else if (slideIndex === 2) onProductTypeChange('discount');
  };

  return (
    <div className='intro win-intro'>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.bagImg} alt='Elfbar Slide' />
            <span className='discount-text'>50%</span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.huskyProduct1} alt='Elflio Slide' />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.notFound} alt='Discount Slide' />
          </div>
        </SwiperSlide>
      </Swiper>
      <span className='status-text'>Поздравляем, вы выиграли!</span>
    </div>
  );
};
