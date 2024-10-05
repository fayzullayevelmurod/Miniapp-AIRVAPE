import React, { memo, useEffect, useState } from 'react';
import { getCaseContent } from '../api/services/caseService';
import assets from '../assets';

const defaultImages = {
  type1: assets.productImg1, // 1-tur mahsulot uchun default rasm
  type2: assets.productImg2, // 2-tur mahsulot uchun default rasm
  type3: assets.productImg3, // 3-tur mahsulot uchun default rasm
  default: assets.productImg1, // Umumiy defolt rasm (agar boshqa turga to'g'ri kelmasa)
};

export const Products = memo(({ productType, caseId = 1 }) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getCaseContent(caseId);

        if (data && data.content && typeof data.content === 'object') {
          setContent(
            Object.entries(data.content).map(([key, value], idx) => ({
              key,
              value,
              photo:
                value.photo ||
                defaultImages[`type${idx + 1}`] ||
                defaultImages.default,
            }))
          );
        } else {
          setContent([]);
        }
      } catch (error) {
        console.error('Kontentni olishda xatolik:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [caseId]);

  if (isLoading) {
    return <div>Загрузка контента...</div>;
  }

  return (
    <div className='products'>
      <div className='products-top'>
        <h2 className='products-title'>Что внутри?</h2>
        <span className='product-count'>{content.length} предметов</span>
      </div>
      <div className='cards'>
        {content.map((item, idx) => (
          <div className={`card`} key={idx}>
            {/* Har bir mahsulot uchun to'g'ri rasm ko'rsatiladi */}
            <img src={item.photo} alt={item.key} />
          </div>
        ))}
      </div>
    </div>
  );
});
