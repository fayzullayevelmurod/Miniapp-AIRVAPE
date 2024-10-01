import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import assets from '../assets';
import {
  firstOpenCase,
  updateUserInfo,
  getCaseList,
} from '../api/services/caseService';

export const Intro = ({ onProductTypeChange, chatId }) => {
  const [cases, setCases] = useState([]); // Case'lar ro'yxati uchun state
  const [caseList, setCaseList] = useState([]);
  const [isWinner, setIsWinner] = useState(null); // Foydalanuvchi yutgan/yutmaganligini tekshirish uchun state
  const [selectedCaseId, setSelectedCaseId] = useState(null); // Bosilgan case ID'sini saqlash
  const [isCaseOpened, setIsCaseOpened] = useState(false); // Case ochilganmi yoki yo'qmi kuzatib borish uchun

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

    fetchCases();
  }, []);

  const handleSlideChange = (swiper) => {
    const slideIndex = swiper.activeIndex;
    if (slideIndex === 0) onProductTypeChange('elfbar');
    else if (slideIndex === 1) onProductTypeChange('elflio');
    else if (slideIndex === 2) onProductTypeChange('discount');
  };

  const handleOpenCase = async (caseId) => {
    try {
      setSelectedCaseId(caseId); // Tanlangan case ID'sini saqlash
      setIsCaseOpened(true); // Case ochilganini belgilaymiz
      const data = await firstOpenCase(caseId);
      setCaseList(data);
      console.log("Case ma'lumotlari:", data);

      // Foydalanuvchi yutganmi yoki yo'qmi tekshiramiz
      if (data.win_item) {
        setIsWinner(true); // Foydalanuvchi yutgan
      } else {
        setIsWinner(false); // Foydalanuvchi yutmagan
      }

      // Case ochilgandan so'ng foydalanuvchi ma'lumotlarini yangilash
      const caseInfoForUser = {
        id: caseId,
        content: data.content,
      };

      await updateUserInfo(chatId, caseInfoForUser); // Foydalanuvchini yangilash
      console.log("Foydalanuvchi ma'lumotlari yangilandi.");
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
              <img src={caseItem.content.sale} alt={caseItem.name} />
            </div>
            {/* Agar case ochilmagan bo'lsa, button ko'rsatamiz */}
            {!isCaseOpened && (
              <Button onClick={() => handleOpenCase(caseItem.id)}>
                Открыть
              </Button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Tanlangan case bo'yicha yutgan yoki yutmaganligini ko'rsatish */}
      {selectedCaseId !== null && (
        <div className='result-message'>
          {isWinner === true ? (
            <p className='status-text'>Поздравляем, вы выиграли!</p>
          ) : (
            <p className='status-text'>Ничего, в следующий раз точно повезет</p>
          )}
        </div>
      )}
    </div>
  );
};
