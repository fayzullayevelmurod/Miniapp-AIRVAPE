import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import {
  firstOpenCase,
  openCase,
  updateUserInfo,
  getCaseList,
} from '../api/services/caseService';
import { getUserData } from '../api/services/authService';
import assets from '../assets';

export const Intro = ({ onProductTypeChange }) => {
  const [cases, setCases] = useState([]); // Case'lar ro'yxati uchun state
  const [isWinner, setIsWinner] = useState(null); // Foydalanuvchi yutgan/yutmaganligini tekshirish uchun state
  const [selectedCaseId, setSelectedCaseId] = useState(null); // Bosilgan case ID'sini saqlash
  const [isCaseOpened, setIsCaseOpened] = useState(false); // Case ochilganmi yoki yo'qmi kuzatib borish uchun
  const [isLoading, setIsLoading] = useState(true); // Yuklanish holatini boshqarish
  const [chatId, setChatId] = useState(null); // Foydalanuvchi chatId ni olish uchun state
  const [userData, setUserData] = useState(null); // Foydalanuvchi ma'lumotlari

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini olish
    const fetchUserData = async () => {
      try {
        const data = await getUserData(0); // Foydalanuvchi ma'lumotlarini olish
        setUserData(data); // Ma'lumotlarni statega o'rnatish
        setChatId(data.chat_id); // chatId ni state ga o'rnatamiz
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xatolik:", error);
      }
    };

    fetchUserData();

    // Case'lar ro'yxatini olish
    const fetchCases = async () => {
      try {
        const data = await getCaseList();
        setCases(data);
      } catch (error) {
        console.error("Case ro'yxatini olishda xatolik:", error);
      } finally {
        setIsLoading(false); // Yuklash tugadi
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

      let data;
      console.log(userData, 'user-data');

      // case_info ni tekshiramiz (foydalanuvchining case_info bo'sh yoki yo'qligini aniqlash)
      if (!userData.case_info || Object.keys(userData.case_info).length === 0) {
        data = await firstOpenCase(caseId); // Agar bo'sh bo'lsa first_open so'rovi yuboriladi
        console.log('Birnchi marta case ochildi:', data);
      } else {
        data = await openCase(caseId); // Agar mavjud bo'lsa open so'rovi yuboriladi
        console.log('Case avval ochilgan:', data);
      }

      // Foydalanuvchi yutganmi yoki yo'qmi tekshiramiz
      if (data.win_item) {
        setIsWinner(true); // Foydalanuvchi yutgan
      } else {
        setIsWinner(false); // Foydalanuvchi yutmagan
      }

      // Case ochilgandan so'ng, POST so'rovi orqali yangilangan ma'lumotlarni serverga yuboramiz
      const caseInfoForUser = {
        balance: userData.balance, // Foydalanuvchi balansini dinamik olish
        chat_id: userData.chat_id, // chatId ni dinamik olish
        id: caseId, // Case ID
        username: userData.username, // Foydalanuvchi nomi
        case_info: {
          case_id: caseId, // Case ID
          number_raffle: data.number_raffle, // Raffle soni
          win_item: data.win_item, // Yutgan yutmaganligi
        },
      };

      if (chatId !== null && chatId !== undefined) {
        console.log("Yuborilayotgan ma'lumotlar:", caseInfoForUser);

        await updateUserInfo(chatId, caseInfoForUser);
        console.log("Foydalanuvchi ma'lumotlari yangilandi.");
      }
    } catch (error) {
      console.error('Case ni ochishda xatolik:', error);
    }
  };

  if (isLoading) {
    return <div>Kontent yuklanmoqda...</div>;
  }

  return (
    <div className='intro'>
      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
      >
        {/* Case'lar yuklanganidan keyin kontentni ko'rsatamiz */}
        {cases.length > 0 &&
          cases[0].content &&
          Object.keys(cases[0].content).map((key, index) => (
            <SwiperSlide key={index}>
              <div className='product-card'>
                <img
                  src={cases[0].content[key] || assets.slideImg1}
                  alt={key}
                />
              </div>
              {/* Agar case ochilmagan bo'lsa, button ko'rsatamiz */}
              {!isCaseOpened && (
                <Button onClick={() => handleOpenCase(cases[0].id)}>
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
