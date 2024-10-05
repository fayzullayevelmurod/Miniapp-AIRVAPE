import React, { useEffect, useState } from 'react';
import assets from '../assets';
import { getUserData } from '../api/services/authService';
import { getHistoryData } from '../api/services/historyService';

export const Header = () => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [historyCount, setHistoryCount] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserData(0);
        setUsername(userData.username);
        setBalance(userData.balance);

        const historyData = await getHistoryData();
        setHistoryCount(historyData.length);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className='header'>
      <div className='header-head'>
        <h1 className='header-head__title'>AIRVAPE</h1>
        <span className='header-head__info'>мини-приложение</span>
      </div>
      <div className='header-user__box'>
        <span className='header-user__box-text'>SPIN #{historyCount}</span>{' '}
        {/* History soni */}
        <div className='user-box'>
          <img
            className='user-img'
            src={assets.userImg}
            alt='user img'
            width={32}
            height={44}
          />
          <span className='user-name header-user__box-text'>@{username}</span>{' '}
          {/* Username */}
        </div>
        <span className='header-user__box-text'>${balance}</span>{' '}
        {/* Balance */}
      </div>
    </header>
  );
};
