import React from 'react';

export const Button = ({ children, onClick }) => {
  return (
    <button className='primary-btn' onClick={onClick}>
      {children}
    </button>
  );
};
