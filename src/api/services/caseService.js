import { API_URL } from "../apiConfig";


export const openCase = async (caseId) => {
  try {
    const response = await fetch(`${API_URL}/open?id=${caseId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Case ni ochishda xatolik yuz berdi.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API xatoligi:', error);
    throw error;
  }
};

export const getCaseList = async () => {
  try {

    const response = await fetch(`${API_URL}/case`, {
      method: 'GET',
    });


    if (!response.ok) {
      throw new Error('Case ro\'yxatini olishda xatolik yuz berdi.');
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API xatoligi:', error);
    throw error;
  }
};


export const getCaseContent = async (caseId) => {
  try {

    const response = await fetch(`${API_URL}/case?id=${caseId}`, {
      method: 'GET',
    });


    if (!response.ok) {
      throw new Error('Case kontentini olishda xatolik yuz berdi.');
    }


    const data = await response.json();

    return data;
  } catch (error) {
    console.error('API xatoligi:', error);
    throw error;
  }
};


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
    console.error('API xatoligi:', error);
    throw error;
  }
};


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

    return data;
  } catch (error) {
    console.error("Qiymatni o'zgartirishda xatolik:", error);
    throw error;
  }
};


export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Foydalanuvchini yaratishda xatolik yuz berdi.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Foydalanuvchi yaratishda API xatoligi:", error);
    throw error;
  }
};
