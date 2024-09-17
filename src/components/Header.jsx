import React from 'react';
import assets from '../assets';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header-head'>
        <h1 className='header-head__title'>AIRVAPE</h1>
        <span className='header-head__info'>мини-приложение</span>
      </div>
      <div className='header-user__box'>
        <span className='header-user__box-text'>SPIN #2</span>
        <div className='user-box'>
          <img
            className='user-img'
            src={assets.userImg}
            alt='user img'
            width={32}
            height={44}
          />
          <span className='user-name header-user__box-text'>@username</span>
        </div>
        <span className='header-user__box-text'>$32</span>
      </div>
    </header>
  );
};
