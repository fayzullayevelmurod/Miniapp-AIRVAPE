// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Button } from '../components';
// import 'swiper/css';
// import {
//   firstOpenCase,
//   openCase,
//   updateUserInfo,
//   getCaseList,
//   getCaseContent, // Random slider uchun kontent olish
// } from '../api/services/caseService';
// import { getUserData } from '../api/services/authService';
// import { getHistoryData } from '../api/services/historyService';
// import assets from '../assets';

// const defaultImages = {
//   type1: assets.productImg1,
//   type2: assets.productImg2,
//   type3: assets.productImg3,
//   default: assets.productImg1,
// };

// export const Intro = ({ onProductTypeChange }) => {
//   const [cases, setCases] = useState([]);
//   const [isWinner, setIsWinner] = useState(null);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [isCaseOpened, setIsCaseOpened] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [chatId, setChatId] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [historyCount, setHistoryCount] = useState(0);
//   const [showRandomSwiper, setShowRandomSwiper] = useState(false);
//   const [randomContent, setRandomContent] = useState([]);
//   const [showLine, setShowLine] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const userData = await getUserData(0);
//         setUserData(userData);
//         setChatId(userData.chat_id);
//         setUsername(userData.username);
//         setBalance(userData.balance);

//         const historyData = await getHistoryData();
//         setHistoryCount(historyData.length);

//         const caseData = await getCaseList();
//         setCases(caseData);
//       } catch (error) {
//         console.error("Ma'lumotlarni yuklashda xatolik:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const [cards, setCards] = useState([]);
//   const [newMargin, setNewMargin] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);

//   useEffect(() => {
//     // Karta massivini yaratamiz va uni bir necha marta ko'paytiramiz
//     const initialCards = [
//       { id: 1, type: 'common', label: 'Common', img: assets.productImg1 },
//       { id: 2, type: 'rare', label: 'Rare', img: assets.productImg2 },
//       { id: 3, type: 'mythical', label: 'Mythical', img: assets.productImg3 },
//       { id: 4, type: 'legendary', label: 'Legendary', img: assets.productImg1 },
//     ];

//     // Kartalarni bir necha marta ko'paytirish
//     const extendedCards = [...Array(50).keys()].flatMap(() => initialCards);
//     setCards(extendedCards);
//   }, []);

//   const spin = () => {
//     setIsSpinning(true);
//     let distance = 20 * 100; // Bir karta o'lchamiga nisbatan masofa

//     // Tasodifiy masofani hisoblash
//     distance = Math.floor(Math.random() * cards.length * 5) + cards.length * 10;
//     const rand = Math.floor(Math.random() * 100) + 1;
//     distance *= rand;

//     // Yangi margin qiymatini o'rnatish
//     const newMarginValue = -distance;
//     setNewMargin(newMarginValue);

//     // Spin tugaganidan keyin animatsiyani to'xtatish
//     setTimeout(() => {
//       setIsSpinning(false);
//     }, 7500); // Animatsiya davomiyligi
//   };

//   const [content, setContent] = useState([]);
//   const caseId = 1;
//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const data = await getCaseContent(caseId);

//         if (data && data.content && typeof data.content === 'object') {
//           setContent(
//             Object.entries(data.content).map(([key, value], idx) => ({
//               key,
//               value,
//               photo:
//                 value.photo ||
//                 defaultImages[`type${idx + 1}`] ||
//                 defaultImages.default,
//             }))
//           );
//         } else {
//           setContent([]);
//         }
//       } catch (error) {
//         console.error('Kontentni olishda xatolik:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContent();
//   }, [caseId]);

//   const handleSlideChange = (swiper) => {
//     const slideIndex = swiper.activeIndex;
//     if (slideIndex === 0) onProductTypeChange('elfbar');
//     else if (slideIndex === 1) onProductTypeChange('elflio');
//     else if (slideIndex === 2) onProductTypeChange('discount');
//   };

//   const handleOpenCase = async (caseId) => {
//     try {
//       setSelectedCaseId(caseId);
//       setIsCaseOpened(true);
//       setShowLine(true);

//       let data;

//       if (!userData.case_info || Object.keys(userData.case_info).length === 0) {
//         data = await firstOpenCase(caseId);
//       } else {
//         data = await openCase(caseId);
//       }

//       if (data.win_item) {
//         setIsWinner(true);
//       } else {
//         setIsWinner(false);
//       }

//       const caseInfoForUser = {
//         balance: userData.balance,
//         chat_id: userData.chat_id,
//         id: caseId,
//         username: userData.username,
//         case_info: {
//           case_id: caseId,
//           number_raffle: data.number_raffle,
//           win_item: data.win_item,
//         },
//       };

//       if (chatId !== null) {
//         await updateUserInfo(chatId, caseInfoForUser);
//         const updatedHistoryData = await getHistoryData();
//         setHistoryCount(updatedHistoryData.length);
//       }

//       const randomContentData = await getCaseContent(caseId);
//       setRandomContent(randomContentData.items);
//       setShowRandomSwiper(true);
//     } catch (error) {
//       console.error('Case ni ochishda xatolik:', error);
//     }
//   };

//   const handleRandomSliderFinish = (swiper) => {
//     const centerIndex = Math.floor(swiper.slides.length / 2);

//     if (isWinner) {
//       swiper.slideTo(centerIndex, 1000);
//     } else {
//       swiper.slideTo(centerIndex + 1, 1000);
//     }
//   };

//   if (isLoading) {
//     return <div>Kontent yuklanmoqda...</div>;
//   }

//   return (
//     <div className='intro'>
//       <div className='header-user__box'>
//         <span className='header-user__box-text'>SPIN #{historyCount}</span>{' '}
//         <div className='user-box'>
//           <img
//             className='user-img'
//             src={assets.userImg}
//             alt='user img'
//             width={32}
//             height={44}
//           />
//           <span className='user-name header-user__box-text'>@{username}</span>{' '}
//         </div>
//         <span className='header-user__box-text'>${balance}</span>{' '}
//       </div>
//       <div className={`line ${showLine ? 'show' : ''}`}></div>{' '}
//       {!showRandomSwiper && (
//         <Swiper
//           spaceBetween={24}
//           slidesPerView={2}
//           centeredSlides={true}
//           onSlideChange={handleSlideChange}
//         >
//           {cases.length > 0 &&
//             cases[0].content &&
//             Object.keys(cases[0].content).map((key, index) => (
//               <SwiperSlide key={index}>
//                 <div className='product-card'>
//                   <img
//                     src={cases[0].content[key] || assets.slideImg1}
//                     alt={key}
//                   />
//                 </div>
//                 {!isCaseOpened && (
//                   <Button onClick={() => handleOpenCase(cases[0].id)}>
//                     Открыть
//                   </Button>
//                 )}
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       )}
//       {showRandomSwiper && (
//         // <Swiper
//         //   spaceBetween={24}
//         //   slidesPerView={2.3}
//         //   centeredSlides={true}
//         //   loop={true}
//         //   autoplay={{ delay: 2000 }}
//         //   speed={100}
//         //   onReachEnd={handleRandomSliderFinish}
//         //   className='random-swiper'
//         // >
//         //   {content?.map((item, idx) => (
//         //     <SwiperSlide key={idx}>
//         //       <div className='random-card'>
//         //         <img src={item.photo} alt={item.key} />
//         //       </div>
//         //     </SwiperSlide>
//         //   ))}
//         // </Swiper>
//         <div
//           className='cardList'
//           style={{
//             display: 'flex',
//             marginLeft: newMargin,
//             transition: 'margin-left 7.5s ease',
//           }}
//         >
//           {content?.map((card, idx) => (
//             <div
//               key={idx}
//               className={`card ${card.type}`}
//               style={{ margin: '0 10px' }}
//             >
//               <img
//                 src={card.img}
//                 alt={card.label}
//                 style={{ width: '100px', height: '100px' }}
//               />
//               <span>{card.label}</span>
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedCaseId !== null && (
//         <div className='result-message'>
//           {isWinner === true ? (
//             <p className='status-text'>Поздравляем, вы выиграли!</p>
//           ) : (
//             <p className='status-text'>Ничего, в следующий раз точно повезет</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Button } from '../components';
// import 'swiper/css';
// import {
//   firstOpenCase,
//   openCase,
//   updateUserInfo,
//   getCaseList,
//   getCaseContent, // Random slider uchun kontent olish
// } from '../api/services/caseService';
// import { getUserData } from '../api/services/authService';
// import { getHistoryData } from '../api/services/historyService';
// import assets from '../assets';

// export const Intro = ({ onProductTypeChange }) => {
//   const [cases, setCases] = useState([]);
//   const [isWinner, setIsWinner] = useState(null);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [isCaseOpened, setIsCaseOpened] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [chatId, setChatId] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [historyCount, setHistoryCount] = useState(0);
//   const [showRandomSwiper, setShowRandomSwiper] = useState(false);
//   const [randomContent, setRandomContent] = useState([]);
//   const [showLine, setShowLine] = useState(false);
//   const [newMargin, setNewMargin] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const userData = await getUserData(0);
//         setUserData(userData);
//         setChatId(userData.chat_id);
//         setUsername(userData.username);
//         setBalance(userData.balance);

//         const historyData = await getHistoryData();
//         setHistoryCount(historyData.length);

//         const caseData = await getCaseList();
//         setCases(caseData);
//       } catch (error) {
//         console.error("Ma'lumotlarni yuklashda xatolik:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const [content, setContent] = useState([]);
//   const caseId = 1;

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const data = await getCaseContent(caseId);

//         if (data && data.content && typeof data.content === 'object') {
//           setContent(
//             Object.entries(data.content).map(([key, value], idx) => ({
//               key,
//               value,
//               photo: value.photo || assets.productImg1, // API'dan kelgan fotoni qo'shish
//             }))
//           );
//         } else {
//           setContent([]);
//         }
//       } catch (error) {
//         console.error('Kontentni olishda xatolik:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContent();
//   }, [caseId]);

//   const handleOpenCase = async (caseId) => {
//     try {
//       setSelectedCaseId(caseId);
//       setIsCaseOpened(true);
//       setShowLine(true); // Line'ga 'show' class qo'shish

//       let data;

//       // Foydalanuvchi case_info'si bo'shmi yoki yo'qmi tekshirish
//       if (!userData.case_info || Object.keys(userData.case_info).length === 0) {
//         data = await firstOpenCase(caseId);
//       } else {
//         data = await openCase(caseId);
//       }

//       if (data.win_item) {
//         setIsWinner(true);
//       } else {
//         setIsWinner(false);
//       }

//       const caseInfoForUser = {
//         balance: userData.balance,
//         chat_id: userData.chat_id,
//         id: caseId,
//         username: userData.username,
//         case_info: {
//           case_id: caseId,
//           number_raffle: data.number_raffle,
//           win_item: data.win_item,
//         },
//       };

//       if (chatId !== null) {
//         await updateUserInfo(chatId, caseInfoForUser);
//         const updatedHistoryData = await getHistoryData();
//         setHistoryCount(updatedHistoryData.length);
//       }

//       const randomContentData = await getCaseContent(caseId);
//       setRandomContent(randomContentData.content);
//       setCards(randomContentData.content);
//       setShowRandomSwiper(true);

//       // Spinni ishga tushiramiz
//       spin();
//     } catch (error) {
//       console.error('Case ni ochishda xatolik:', error);
//     }
//   };

//   const spin = () => {
//     setIsSpinning(true);
//     let distance = 20 * 100; // Bir karta o'lchamiga nisbatan masofa

//     // Tasodifiy masofani hisoblash
//     distance = Math.floor(Math.random() * cards.length * 5) + cards.length * 10;
//     const rand = Math.floor(Math.random() * 100) + 1;
//     distance *= rand;

//     // Yangi margin qiymatini o'rnatish
//     const newMarginValue = -distance;
//     setNewMargin(newMarginValue);

//     // Spin tugaganidan keyin animatsiyani to'xtatish
//     setTimeout(() => {
//       setIsSpinning(false);
//     }, 7500); // Animatsiya davomiyligi
//   };

//   if (isLoading) {
//     return <div>Kontent yuklanmoqda...</div>;
//   }

//   return (
//     <div className='intro'>
//       <div className='header-user__box'>
//         <span className='header-user__box-text'>SPIN #{historyCount}</span>{' '}
//         <div className='user-box'>
//           <img
//             className='user-img'
//             src={assets.userImg}
//             alt='user img'
//             width={32}
//             height={44}
//           />
//           <span className='user-name header-user__box-text'>@{username}</span>{' '}
//         </div>
//         <span className='header-user__box-text'>${balance}</span>{' '}
//       </div>
//       <div className={`line ${showLine ? 'show' : ''}`}></div>

//       {!showRandomSwiper && (
//         <Swiper
//           spaceBetween={24}
//           slidesPerView={2}
//           centeredSlides={true}
//           onSlideChange={() => handleOpenCase(selectedCaseId)}
//         >
//           {cases.length > 0 &&
//             cases[0].content &&
//             Object.keys(cases[0].content).map((key, index) => (
//               <SwiperSlide key={index}>
//                 <div className='product-card'>
//                   <img
//                     src={cases[0].content[key] || assets.slideImg1}
//                     alt={key}
//                   />
//                 </div>
//                 {!isCaseOpened && (
//                   <Button onClick={() => handleOpenCase(cases[0].id)}>
//                     Открыть
//                   </Button>
//                 )}
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       )}

//       {showRandomSwiper && (
//         <div
//           className='cardList'
//           style={{
//             display: 'flex',
//             marginLeft: newMargin,
//             transition: 'margin-left 7.5s ease',
//           }}
//         >
//           {content?.map((card, idx) => (
//             <div
//               key={idx}
//               className={`card common ${card.type}`}
//               style={{ margin: '0 10px' }}
//             >
//               <img
//                 src={card.photo || assets.productImg1}
//                 alt={card.type}
//                 style={{ width: '100px', height: '100px' }}
//               />
//               <span>{card.type}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedCaseId !== null && (
//         <div className='result-message'>
//           {isWinner === true ? (
//             <p className='status-text'>Поздравляем, вы выиграли!</p>
//           ) : (
//             <p className='status-text'>Ничего, в следующий раз точно повезет</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Button } from '../components';
// import 'swiper/css';
// import {
//   firstOpenCase,
//   openCase,
//   updateUserInfo,
//   getCaseList,
// } from '../api/services/caseService';
// import { getUserData } from '../api/services/authService';
// import { getHistoryData } from '../api/services/historyService';
// import assets from '../assets';

// export const Intro = ({ onProductTypeChange }) => {
//   // State'lar
//   const [cases, setCases] = useState([]);
//   const [isWinner, setIsWinner] = useState(null);
//   const [selectedCaseId, setSelectedCaseId] = useState(null);
//   const [isCaseOpened, setIsCaseOpened] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [chatId, setChatId] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [username, setUsername] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [historyCount, setHistoryCount] = useState(0);

//   // Foydalanuvchi va case'lar ma'lumotlarini olish uchun useEffect
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         // Foydalanuvchi ma'lumotlari
//         const userData = await getUserData(0);
//         setUserData(userData);
//         setChatId(userData.chat_id);
//         setUsername(userData.username);
//         setBalance(userData.balance);

//         // Spin (historyCount) ma'lumotini olish
//         const historyData = await getHistoryData();
//         setHistoryCount(historyData.length);

//         // Case ro'yxatini olish
//         const caseData = await getCaseList();
//         setCases(caseData);
//       } catch (error) {
//         console.error("Ma'lumotlarni yuklashda xatolik:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const handleSlideChange = (swiper) => {
//     const slideIndex = swiper.activeIndex;
//     if (slideIndex === 0) onProductTypeChange('elfbar');
//     else if (slideIndex === 1) onProductTypeChange('elflio');
//     else if (slideIndex === 2) onProductTypeChange('discount');
//   };

//   const handleOpenCase = async (caseId) => {
//     try {
//       setSelectedCaseId(caseId);
//       setIsCaseOpened(true);

//       let data;

//       // Foydalanuvchi case_info'si bo'shmi yoki yo'qmi tekshirish
//       if (!userData.case_info || Object.keys(userData.case_info).length === 0) {
//         data = await firstOpenCase(caseId);
//         console.log('Birnchi marta case ochildi:', data);
//       } else {
//         data = await openCase(caseId);
//         console.log('Case avval ochilgan:', data);
//       }

//       if (data.win_item) {
//         setIsWinner(true); // Foydalanuvchi yutgan
//       } else {
//         setIsWinner(false); // Foydalanuvchi yutmagan
//       }

//       // Foydalanuvchi ma'lumotlarini yangilash
//       const caseInfoForUser = {
//         balance: userData.balance,
//         chat_id: userData.chat_id,
//         id: caseId,
//         username: userData.username,
//         case_info: {
//           case_id: caseId,
//           number_raffle: data.number_raffle,
//           win_item: data.win_item,
//         },
//       };

//       if (chatId !== null && chatId !== undefined) {
//         console.log("Yuborilayotgan ma'lumotlar:", caseInfoForUser);
//         await updateUserInfo(chatId, caseInfoForUser);
//         console.log("Foydalanuvchi ma'lumotlari yangilandi.");

//         // SPIN ni yangilash uchun yana getHistoryData chaqirish
//         const updatedHistoryData = await getHistoryData();
//         setHistoryCount(updatedHistoryData.length);
//       }
//     } catch (error) {
//       console.error('Case ni ochishda xatolik:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Kontent yuklanmoqda...</div>;
//   }

//   return (
//     <div className='intro'>
//       <div className='header-user__box'>
//         <span className='header-user__box-text'>SPIN #{historyCount}</span>{' '}
//         <div className='user-box'>
//           <img
//             className='user-img'
//             src={assets.userImg}
//             alt='user img'
//             width={32}
//             height={44}
//           />
//           <span className='user-name header-user__box-text'>@{username}</span>{' '}
//         </div>
//         <span className='header-user__box-text'>${balance}</span>{' '}
//       </div>

//       <Swiper
//         spaceBetween={24}
//         slidesPerView={2}
//         centeredSlides={true}
//         onSlideChange={handleSlideChange}
//       >
//         <div className='line'></div>
//         {cases.length > 0 &&
//           cases[0].content &&
//           Object.keys(cases[0].content).map((key, index) => (
//             <SwiperSlide key={index}>
//               <div className='product-card'>
//                 <img
//                   src={cases[0].content[key] || assets.slideImg1}
//                   alt={key}
//                 />
//               </div>
//               {!isCaseOpened && (
//                 <Button onClick={() => handleOpenCase(cases[0].id)}>
//                   Открыть
//                 </Button>
//               )}
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       {selectedCaseId !== null && (
//         <div className='result-message'>
//           {isWinner === true ? (
//             <p className='status-text'>Поздравляем, вы выиграли!</p>
//           ) : (
//             <p className='status-text'>Ничего, в следующий раз точно повезет</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../components';
import 'swiper/css';
import {
  firstOpenCase,
  openCase,
  updateUserInfo,
  getCaseList,
  getCaseContent,
} from '../api/services/caseService';
import { getUserData } from '../api/services/authService';
import { getHistoryData } from '../api/services/historyService';
import assets from '../assets';

const defaultImages = {
  type1: assets.productImg1,
  type2: assets.productImg2,
  type3: assets.productImg3,
  default: assets.productImg1,
};

export const Intro = ({ onProductTypeChange }) => {
  const [cases, setCases] = useState([]);
  const [isWinner, setIsWinner] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [isCaseOpened, setIsCaseOpened] = useState(false);
  const [winItem, setWinItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const swiperRef = useRef(null);
  const [content, setContent] = useState([]);
  const caseId = 1;
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getCaseContent(caseId);

        if (data && data.content && typeof data.content === 'object') {
          setContent(
            Object.entries(data.content).map(([key, value], idx) => ({
              key,
              value,
              photo:
                value.photo ||
                defaultImages[`type${idx + 1}`] ||
                defaultImages.default,
            }))
          );
        } else {
          setContent([]);
        }
      } catch (error) {
        console.error('Kontentni olishda xatolik:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [caseId]);

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

      if (data.case_info_for_user.win_item) {
        setIsWinner(true);
        setWinItem(data.case_info_for_user.win_item);

        const winItem = data.case_info_for_user.win_item;

        const winItemIndex = Object.keys(cases[0].content).findIndex(
          (key) => key === winItem
        );

        if (swiperRef.current && winItemIndex >= 0) {
          swiperRef.current.slideTo(winItemIndex);
        }
      } else {
        setIsWinner(false);
      }

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
        console.log("Yuborilayotgan ma'lumotlar:", caseInfoForUser);
        await updateUserInfo(chatId, caseInfoForUser);
        console.log("Foydalanuvchi ma'lumotlari yangilandi.");

        const updatedHistoryData = await getHistoryData();
        setHistoryCount(updatedHistoryData.length);
      }
    } catch (error) {
      console.error('Case ni ochishda xatolik:', error);
    }
  };

  const getFallbackImage = (index) => {
    const fallbackImages = [
      assets.slideImg1,
      assets.slideImg2,
      assets.slideImg3,
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(content, 'content');

  return (
    <div className={`intro ${isWinner ? 'win-intro' : ''}`}>
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
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {content.length > 0 &&
          content?.map((key, index) => (
            <SwiperSlide key={index}>
              <div className='product-card'>
                <img
                  src={key.photo}
                  // src={cases[0].content[key] || getFallbackImage(index)}
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
        {/* {cases.length > 0 &&
          cases[0].content &&
          Object.keys(cases[0].content).map((key, index) => (
            <SwiperSlide key={index}>
              <div className='product-card'>
                <img
                  src={cases[0].content[key] || getFallbackImage(index)}
                  alt={key}
                />
              </div>
              {!isCaseOpened && (
                <Button onClick={() => handleOpenCase(cases[0].id)}>
                  Открыть
                </Button>
              )}
            </SwiperSlide>
          ))} */}
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
