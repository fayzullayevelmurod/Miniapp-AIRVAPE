import React, { useEffect, useState } from 'react';
import { getPromoData } from '../api/promoService'; // Promo ma'lumotlarini olish xizmati

export const PromoList = () => {
  const [promos, setPromos] = useState([]); // Promo ma'lumotlari uchun state
  const [loading, setLoading] = useState(true); // Yuklanish holati

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const data = await getPromoData(); // API dan promo ma'lumotlarni olish
        setPromos(data); // Ma'lumotlarni state ga o'rnatamiz
      } catch (error) {
        console.error('Promo ma\'lumotlarini yuklashda xatolik:', error);
      } finally {
        setLoading(false); // Yuklanish holatini tugatamiz
      }
    };

    fetchPromoData();
  }, []); // Komponent yuklanganida API chaqiramiz

  if (loading) return <p>Yuklanmoqda...</p>; // Yuklanish holati

  return (
    <div className="promo-list">
      {promos.map((promo) => (
        <div key={promo.id} className="promo-card">
          <h3>{promo.name}</h3>
          <p>Chance: {promo.chance}%</p>
          <p>Prize: {promo.name_prize}</p>
        </div>
      ))}
    </div>
  );
};

