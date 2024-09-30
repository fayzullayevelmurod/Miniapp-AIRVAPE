import React, { useState } from 'react';
import Products from '../layouts/Products';
import { Intro } from '../layouts';
// import { CaseList } from '../components/CaseList';

const Home = () => {
  const [productType, setProductType] = useState('elfbar');

  const handleProductTypeChange = (newType) => {
    setProductType(newType);
  };

  return (
    <div className='home-page'>
      <Intro onProductTypeChange={handleProductTypeChange} />
      <Products productType={productType} />
      {/* <CaseList /> */}
    </div>
  );
};

export default Home;
