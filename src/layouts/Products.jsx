import React, { memo } from 'react';
import assets from '../assets';

const productsMap = {
  elfbar: [
    { img: assets.productImg1, alt: 'Elfbar Product 1' },
    { img: assets.productImg2, alt: 'Elfbar Product 2' },
    { img: assets.productImg3, alt: 'Elflio Product 1' },
    { img: assets.productImg4, alt: 'Elflio Product 2' },
    {
      img: assets.productLogo,
      alt: 'Discount Product 1',
      className: 'product-logo',
    },
    { img: assets.productImg2, alt: 'Discount Product 2' },
  ],
  elflio: [
    { img: assets.huskyProduct1, alt: 'Husky product 1' },
    { img: assets.huskyProduct2, alt: 'Husky product 2' },
    { img: assets.huskyProduct3, alt: 'Husky product 3' },
    { img: assets.huskyProduct4, alt: 'Husky product 4' },
    {
      img: assets.productLogo,
      alt: 'Discount Product 1',
      className: 'product-logo',
    },
    {
      img: assets.productLogo,
      alt: 'Discount Product 1',
      className: 'product-logo',
    },
  ],
  discount: [
    {
      img: assets.discountImg,
      alt: 'Discount icon',
      className: 'discount-card green',
      discountCount: '10%',
    },
    {
      img: assets.discountImg,
      alt: 'Discount icon',
      className: 'discount-card pink',
      discountCount: '30%',
    },
    {
      img: assets.discountImg,
      alt: 'Discount icon',
      className: 'discount-card red',
      discountCount: '50%',
    },
    {
      img: assets.productLogo,
      alt: 'Discount Product 1',
      className: 'product-logo',
    },
    {
      img: assets.bagImg,
      alt: 'Discount icon',
      className: 'product-discount__card',
      discountCount: '50%',
    },
  ],
};

const Products = memo(({ productType }) => {
  const products = productsMap[productType];

  return (
    <div className='products'>
      <div className='products-top'>
        <h2 className='products-title'>Что внутри?</h2>
        <span className='product-count'>{products.length} предметов</span>
      </div>
      <div className='cards'>
        {products.map((product, idx) => (
          <div
            className={`card ${product.className ? product.className : ''}`}
            key={idx}
          >
            <img src={product.img} alt={product.alt} />
            {product.discountCount ? (
              <span className='discount-count'>{product.discountCount}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Products;
