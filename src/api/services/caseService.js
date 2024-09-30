import { API_URL } from "../apiConfig"; // Asosiy API manzili

// Case ni ochish uchun API chaqiruv funksiyasi
export const openCase = async (caseId) => {
  try {
    const response = await fetch(`${API_URL}/open?id=${caseId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Case ni ochishda xatolik yuz berdi.');
    }
    const data = await response.json();
    return data; // API'dan kelgan ma'lumotlarni qaytaradi
  } catch (error) {
    console.error('API xatoligi:', error);
    throw error;
  }
};


// Barcha case'larni olish uchun API chaqiruv funksiyasi
export const getCaseList = async () => {
  try {
    // API'ga GET so'rov yuborib, barcha case'larni olamiz
    const response = await fetch(`${API_URL}/case`, {
      method: 'GET',
    });

    // Agar so'rov muvaffaqiyatli bo'lmasa, xato xabarini chiqaramiz
    if (!response.ok) {
      throw new Error('Case ro\'yxatini olishda xatolik yuz berdi.');
    }

    // So'rovdan qaytgan JSON ma'lumotlarni o'qib olamiz
    const data = await response.json();
    return data; // Case'lar ro'yxatini qaytaramiz
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqaramiz
    throw error; // Xatolikni tashlaymiz
  }
};

// Muayyan case uchun kontent ma'lumotlarini olish
export const getCaseContent = async (caseId) => {
  try {
    // API'ga GET so'rov yuborib, case_id bo'yicha kontent ma'lumotlarini olamiz
    const response = await fetch(`${API_URL}/case?case_id=${caseId}`, {
      method: 'GET',
    });

    // Agar so'rov muvaffaqiyatli bo'lmasa, xato xabarini chiqaramiz
    if (!response.ok) {
      throw new Error('Case kontentini olishda xatolik yuz berdi.');
    }

    // So'rovdan qaytgan JSON ma'lumotlarni o'qib olamiz
    const data = await response.json();
    return data.content; // Kontentni qaytaramiz
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqaramiz
    throw error; // Xatolikni tashlaymiz
  }
};
