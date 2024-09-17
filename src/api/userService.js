import axios from 'axios';

const API_URL = 'HOST/api/user';

export const getUser = async (id = null) => {
  try {
    const response = await axios.get(`${API_URL}${id ? `?id=${id}` : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.post(`${API_URL}?id=${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data', error);
  }
};
