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
  }, [caseId]);

  if (isLoading) {
    return <div>Kontent yuklanmoqda...</div>; // Yuklanish paytidagi holat
  }
  console.log(content, 'content');

  return (
    <div className='products'>
      <div className='products-top'>
        <h2 className='products-title'>Что внутри?</h2>
        <span className='product-count'>{content.length} предметов</span>
        {/* API'dan kelgan kontent sonini ko'rsatamiz */}
      </div>
      <div className='cards'>
        {content.map((item, idx) => (
          <div className={`card`} key={idx}>
            <span>
              {item.key}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
