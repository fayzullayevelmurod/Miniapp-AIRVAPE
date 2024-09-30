import React, { useEffect, useState } from 'react';
import { getCaseData } from '../api/services/caseService';

export const CaseList = () => {
  const [cases, setCases] = useState([]); // Case ma'lumotlari uchun state
  const [loading, setLoading] = useState(true); // Yuklanish holati

  useEffect(() => {
    const fetchCaseData = async () => {
      try {
        const data = await getCaseData(); // API dan case ma'lumotlarini olish
        setCases(data); // Ma'lumotlarni state ga o'rnatamiz
      } catch (error) {
        console.error("Case ma'lumotlarini yuklashda xatolik:", error);
      } finally {
        setLoading(false); // Yuklanish holatini tugatamiz
      }
    };

    fetchCaseData();
  }, []); // Komponent yuklanishda API chaqiramiz

  if (loading) return <p>Yuklanmoqda...</p>; // Yuklanish holati

  return (
    <div className='case-list'>
      {cases.map((caseItem) => (
        <div key={caseItem.id} className='case-card'>
          <h3>{caseItem.name}</h3>
          <p>Ehtimollik: {caseItem.chance.sale}%</p>
        </div>
      ))}
    </div>
  );
};
