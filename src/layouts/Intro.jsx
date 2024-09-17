import React from 'react';
import { Button } from '../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import assets from '../assets';

export const Intro = () => {
  return (
    <div className='intro'>
      <Swiper spaceBetween={24} slidesPerView={2} centeredSlides={true}>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg1} alt='' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg2} alt='' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
        <SwiperSlide>
          <div className='product-card'>
            <img src={assets.slideImg3} alt='' />
          </div>
          <Button>Открыть</Button>
        </SwiperSlide>
        {/* Qo'shimcha slaydlarga kiritishingiz mumkin */}
      </Swiper>
    </div>
  );
};
