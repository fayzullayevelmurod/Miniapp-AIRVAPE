import React, { useState } from 'react';
import Products from '../layouts/Products';
import { WinIntro } from '../layouts';

const Win = () => {
  const [productType, setProductType] = useState('elfbar');

  const handleProductTypeChange = (newType) => {
    setProductType(newType);
  };

  return (
    <div className='home-page'>
      <WinIntro onProductTypeChange={handleProductTypeChange} />
      <Products productType={productType} />
    </div>
  );
};

export default Win;
