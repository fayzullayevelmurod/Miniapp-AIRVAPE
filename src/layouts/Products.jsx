import React from 'react';
import assets from '../assets';

export const Products = () => {
  return (
    <div className='products'>
      <div className='products-top'>
        <h2 className='products-title'>Что внутри?</h2>
        <span className='product-count'>10 предметов</span>
      </div>
      <div className='cards'>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
        <div className='card'>
          <img src={assets.productImg1} alt='product img' />
        </div>
      </div>
    </div>
  );
};
