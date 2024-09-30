import { API_URL } from "../apiConfig";

// Foydalanuvchi ma'lumotlarini olish uchun API chaqiruvi
export const getUserData = async (chatId) => {
  try {
    // API'ga GET so'rov yuborib, chat_id bo'yicha foydalanuvchi ma'lumotlarini olamiz
    const response = await fetch(`${API_URL}/user?chat_id=${chatId}`, {
      method: 'GET',
    });

    // Agar so'rov muvaffaqiyatli bo'lmasa, xato xabarini chiqaramiz
    if (!response.ok) {
      throw new Error('Foydalanuvchi ma\'lumotlarini olishda xatolik yuz berdi.');
    }

    // So'rovdan qaytgan JSON ma'lumotlarni o'qib olamiz
    const data = await response.json();
    return data; // Foydalanuvchi ma'lumotlarini qaytaramiz
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqaramiz
    throw error; // Xatolikni tashlaymiz
  }
};

// Foydalanuvchi ma'lumotlarini yangilash funksiyasi (POST so'rov)
export const updateUserData = async (id, updateData) => {
  try {
    const response = await fetch(`${API_URL}/user?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData), // O'zgartirilayotgan ma'lumotlarni jo'natamiz
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Foydalanuvchi ma\'lumotlarini yangilashda xatolik yuz berdi:', error);
    throw error;
  }
};
