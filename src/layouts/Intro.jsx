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
import { getHistoryData } from '../api/services/historyService';
import assets from '../assets';

export const Intro = ({ onProductTypeChange }) => {
  const [cases, setCases] = useState([]);
  const [isWinner, setIsWinner] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [isCaseOpened, setIsCaseOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userData = await getUserData(0);
        setUserData(userData);
        setChatId(userData.chat_id);
        setUsername(userData.username);
        setBalance(userData.balance);

        const historyData = await getHistoryData();
        setHistoryCount(historyData.length);

        const caseData = await getCaseList();
        setCases(caseData);

        // LocalStorage'dan case holatini olish
        const savedCaseInfo = localStorage.getItem('selectedCase');
        if (savedCaseInfo) {
          const { isWinner, selectedCaseId } = JSON.parse(savedCaseInfo);
          setIsWinner(isWinner);
          setSelectedCaseId(selectedCaseId);
          setIsCaseOpened(true);
        }
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSlideChange = (swiper) => {
    const slideIndex = swiper.activeIndex;
    if (slideIndex === 0) onProductTypeChange('elfbar');
    else if (slideIndex === 1) onProductTypeChange('elflio');
    else if (slideIndex === 2) onProductTypeChange('discount');
  };

  const handleOpenCase = async (caseId) => {
    try {
      setSelectedCaseId(caseId);
      setIsCaseOpened(true);

      let data;

      if (!userData.case_info || Object.keys(userData.case_info).length === 0) {
        data = await firstOpenCase(caseId);
        console.log('Birnchi marta case ochildi:', data);
      } else {
        data = await openCase(caseId);
        console.log('Case avval ochilgan:', data);
      }

      if (data.win_item) {
        setIsWinner(true);
      } else {
        setIsWinner(false);
      }

      // LocalStorage'ga saqlash
      localStorage.setItem(
        'selectedCase',
        JSON.stringify({
          selectedCaseId: caseId,
          isWinner: data.win_item ? true : false,
        })
      );

      const caseInfoForUser = {
        balance: userData.balance,
        chat_id: userData.chat_id,
        id: caseId,
        username: userData.username,
        case_info: {
          case_id: caseId,
          number_raffle: data.number_raffle,
          win_item: data.win_item,
        },
      };

      if (chatId !== null && chatId !== undefined) {
        await updateUserInfo(chatId, caseInfoForUser);

        const updatedHistoryData = await getHistoryData();
        setHistoryCount(updatedHistoryData.length);
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
      <div className='header-user__box'>
        <span className='header-user__box-text'>SPIN #{historyCount}</span>{' '}
        <div className='user-box'>
          <img
            className='user-img'
            src={assets.userImg}
            alt='user img'
            width={32}
            height={44}
          />
          <span className='user-name header-user__box-text'>@{username}</span>{' '}
        </div>
        <span className='header-user__box-text'>${balance}</span>{' '}
      </div>

      <Swiper
        spaceBetween={24}
        slidesPerView={2}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
      >
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
              {!isCaseOpened && (
                <Button onClick={() => handleOpenCase(cases[0].id)}>
                  Открыть
                </Button>
              )}
            </SwiperSlide>
          ))}
      </Swiper>

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
