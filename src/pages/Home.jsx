import React, { useState } from 'react';
import { Intro, Products } from '../layouts';

const Home = () => {
  const [productType, setProductType] = useState('elfbar');
  const handleProductTypeChange = (newType) => {
    setProductType(newType);
  };

  return (
    <div className='home-page'>
      <Intro onProductTypeChange={handleProductTypeChange} />
      <Products productType={productType} />
    </div>
  );
};

export default Home;
