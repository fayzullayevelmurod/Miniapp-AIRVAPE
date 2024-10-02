import React, { memo, useEffect, useState } from 'react';
import { getCaseContent } from '../api/services/caseService';

export const Products = memo(({ productType, caseId = 1 }) => {
  const [content, setContent] = useState([]); // Case kontenti uchun state
  const [isLoading, setIsLoading] = useState(true); // Kontent yuklanayotganini kuzatish uchun

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getCaseContent(caseId); // Case kontentini olish

        // Agar content obyekt bo'lsa, uni massivga aylantiramiz
        if (data && data.content && typeof data.content === 'object') {
          setContent(
            Object.entries(data.content).map(([key, value]) => ({
              key,
              value,
              photo: data.photo, // Rasmlarni ham qo'shamiz
            }))
          );
        } else {
          setContent([]); // Agar ma'lumot bo'lmasa bo'sh massivni o'rnatamiz
        }
      } catch (error) {
        console.error('Kontentni olishda xatolik:', error);
      } finally {
        setIsLoading(false); // Yuklash tugadi
      }
    };

    fetchContent(); // API chaqiruvini boshlash
  }, []);

  if (isLoading) {
    return <div>Kontent yuklanmoqda...</div>; // Yuklanish paytidagi holat
  }

  console.log(content, 'content'); // Ma'lumotlarni konsolda ko'ramiz

  return (
    <div className='products'>
      <div className='products-top'>
        <h2 className='products-title'>Что внутри?</h2>
        <span className='product-count'>{content.length} предметов</span>
      </div>
      <div className='cards'>
        {content.map((item, idx) => (
          <div className={`card`} key={idx}>
            <img src={item.photo} alt={item.key} />
          </div>
        ))}
      </div>
    </div>
  );
});
