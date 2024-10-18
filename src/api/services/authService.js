import { API_URL } from "../apiConfig";

export const getUserData = async (chatId) => {
  try {
    const response = await fetch(`${API_URL}/user?chat_id=${chatId}`, {
      method: 'GET',
    });


    if (!response.ok) {
      throw new Error('Foydalanuvchi ma\'lumotlarini olishda xatolik yuz berdi.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API xatoligi:', error);
    throw error;
  }
};

export const updateUserData = async (id, updateData) => {
  try {
    const response = await fetch(`${API_URL}/user?id=${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Foydalanuvchi ma\'lumotlarini yangilashda xatolik yuz berdi:', error);
    throw error;
  }
};
