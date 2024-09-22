import React, { useState } from 'react';
import Products from '../layouts/Products';
import { Intro } from '../layouts';

const Home = () => {
  // Ma'lumotlarni boshqarish uchun useState
  const [productType, setProductType] = useState('elfbar');

  // Slayder harakatiga qarab mahsulot turini yangilash
  const handleProductTypeChange = (newType) => {
    setProductType(newType);
  };

  return (
    <div className='home-page'>
      {/* productType va handleProductTypeChange funksiyasini props orqali uzatamiz */}
      <Intro onProductTypeChange={handleProductTypeChange} />
      <Products productType={productType} />
    </div>
  );
};

export default Home;
