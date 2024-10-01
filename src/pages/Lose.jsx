import React, { useState } from 'react';
import { LoseIntro, Products } from '../layouts';

const Lose = () => {
  const [productType, setProductType] = useState('elfbar');

  const handleProductTypeChange = (newType) => {
    setProductType(newType);
  };

  return (
    <div className='home-page'>
      <LoseIntro onProductTypeChange={handleProductTypeChange} />
      <Products productType={productType} />
    </div>
  );
};

export default Lose;
