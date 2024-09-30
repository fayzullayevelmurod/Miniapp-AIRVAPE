// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Button } from '../components';
// import 'swiper/css';
// import assets from '../assets';
// import { openCase } from '../api/services/caseService';

// export const Intro = ({ onProductTypeChange }) => {
//   const handleSlideChange = (swiper) => {
//     const slideIndex = swiper.activeIndex;
//     if (slideIndex === 0) onProductTypeChange('elfbar');
//     else if (slideIndex === 1) onProductTypeChange('elflio');
//     else if (slideIndex === 2) onProductTypeChange('discount');
//   };

//   const handleOpenCase = async (caseId) => {
//     try {
//       const data = await openCase(caseId);
//       console.log("Case ma'lumotlari:", data);
//     } catch (error) {
//       console.error('Case ni ochishda xatolik:', error);
//     }
//   };

//   return (
//     <div className='intro'>
//       <Swiper
//         spaceBetween={24}
//         slidesPerView={2}
//         centeredSlides={true}
//         onSlideChange={handleSlideChange}
//       >
//         <SwiperSlide>
//           <div className='product-card'>
//             <img src={assets.slideImg1} alt='Elfbar Slide' />
//           </div>
//           <Button onClick={() => handleOpenCase(1)}>Открыть</Button>{' '}
//           {/* Button bosilganda case ochiladi */}
//         </SwiperSlide>
//         <SwiperSlide>
//           <div className='product-card'>
//             <img src={assets.slideImg2} alt='Elflio Slide' />
//           </div>
//           <Button onClick={() => handleOpenCase(2)}>Открыть</Button>
//         </SwiperSlide>
//         <SwiperSlide>
//           <div className='product-card'>
//             <img src={assets.slideImg3} alt='Discount Slide' />
//           </div>
//           <Button onClick={() => handleOpenCase(3)}>Открыть</Button>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import assets from '../assets';
import { openCase, getCaseList } from '../api/services/caseService';

export const Intro = ({ onProductTypeChange }) => {
  const [cases, setCases] = useState([]); // Case'lar ro'yxati uchun state

  useEffect(() => {
    // Component yuklanganda case ro'yxatini olish
    const fetchCases = async () => {
      try {
        const data = await getCaseList(); // Case'lar ro'yxatini olish
        setCases(data); // Case'larni state ga o'rnatish
      } catch (error) {
        console.error("Case ro'yxatini olishda xatolik:", error);
      }
    };

    fetchCases(); // Case'larni olish
  }, []);

  const handleSlideChange = (swiper) => {
    const slideIndex = swiper.activeIndex;
    if (slideIndex === 0) onProductTypeChange('elfbar');
    else if (slideIndex === 1) onProductTypeChange('elflio');
    else if (slideIndex === 2) onProductTypeChange('discount');
  };

  const handleOpenCase = async (caseId) => {
    try {
      const data = await openCase(caseId);
      console.log("Case ma'lumotlari:", data);
    } catch (error) {
      console.error('Case ni ochishda xatolik:', error);
    }
  };

  return (
    <div className='intro'>
      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
      >
        {cases.map((caseItem, index) => (
          <SwiperSlide key={index}>
            <div className='product-card'>
              {/* <img
                src={caseItem.content.sale || assets.slideImg1}
                alt={`Case ${index + 1}`}
              /> */}
              <img src={caseItem.content.sale} alt={`Case ${index + 1}`} />
            </div>
            <Button onClick={() => handleOpenCase(caseItem.id)}>Открыть</Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
