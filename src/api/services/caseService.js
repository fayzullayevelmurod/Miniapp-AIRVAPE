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
    const response = await fetch(`${API_URL}/case?id=${caseId}`, {
      method: 'GET',
    });

    // Agar so'rov muvaffaqiyatli bo'lmasa, xato xabarini chiqaramiz
    if (!response.ok) {
      throw new Error('Case kontentini olishda xatolik yuz berdi.');
    }

    // So'rovdan qaytgan JSON ma'lumotlarni o'qib olamiz
    const data = await response.json();
    // Butun data obyektini qaytaramiz, chunki boshqa ma'lumotlar ham kerak bo'lishi mumkin
    return data;
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqaramiz
    throw error; // Xatolikni tashlaymiz
  }
};

// Foydalanuvchi ma'lumotlarini yangilash uchun POST so'rov
export const updateUserInfo = async (chatId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/user?chat_id=${chatId}`, {
      method: 'POST',
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Foydalanuvchi ma\'lumotlarini yangilashda xatolik yuz berdi.');
    }

    const data = await response.json();
    console.log('yangilangan malumot', data);

    return data;
  } catch (error) {
    console.error('API xatoligi:', error); // Xatolikni konsolda chiqarish
    throw error;
  }
};

// Case'ni birinchi marta ochish funksiyasi
export const firstOpenCase = async (caseId) => {
  try {
    const response = await fetch(`${API_URL}/first_open?id=${caseId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error("Case'ni birinchi marta ochishda xatolik.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Case'ni ochishda API xatoligi:", error);
    throw error;
  }
};


export const changeUserValue = async (userId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/user?id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Foydalanuvchi ma'lumotlarni yangilashda xatolik.");
    }

    const data = await response.json();
    console.log("changeUserValue", data);

    return data; // Yangilangan ma'lumotlarni qaytaradi
  } catch (error) {
    console.error("Qiymatni o'zgartirishda xatolik:", error);
    throw error;
  }
};

// create user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON formatda ma'lumot yuboriladi
      },
      body: JSON.stringify(userData), // Ma'lumotlarni JSON formatga o'giramiz va yuboramiz
    });

    if (!response.ok) {
      throw new Error("Foydalanuvchini yaratishda xatolik yuz berdi.");
    }

    const data = await response.json();
    return data; // Yuborilgan ma'lumotlar qaytariladi yoki serverdan kelgan javob
  } catch (error) {
    console.error("Foydalanuvchi yaratishda API xatoligi:", error);
    throw error;
  }
};
