import { API_URL } from './apiConfig';

// Promo ma'lumotlarini olish
export const getPromoData = async () => {
  try {
    const response = await fetch(`${API_URL}/promo`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Promo ma\'lumotlarini olishda xatolik yuz berdi.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
