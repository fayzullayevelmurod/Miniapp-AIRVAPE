import { API_URL } from "../apiConfig";

// History ma'lumotlarini olish uchun API chaqiruvi
export const getHistoryData = async () => {
  try {
    // API'ga GET so'rov yuborib, history ma'lumotlarini olamiz
    const response = await fetch(`${API_URL}/history`, {
      method: 'GET',
    });

    // Agar so'rov muvaffaqiyatli bo'lmasa, xato xabarini chiqaramiz
    if (!response.ok) {
      throw new Error('History ma\'lumotlarini olishda xatolik yuz berdi.');
    }

    // So'rovdan qaytgan JSON ma'lumotlarni o'qib olamiz
    const data = await response.json();
    return data; // History ma'lumotlarini qaytaramiz
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqaramiz
    throw error; // Xatolikni tashlaymiz
  }
};
