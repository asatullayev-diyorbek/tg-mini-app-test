import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1'; // Ensure this matches your backend

export const login = async (initData) => {
  try {
    console.log('Sending initData to backend...');
    const response = await axios.post(`${API_URL}/login`, { initData });

    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getAccessToken = () => localStorage.getItem('accessToken');
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};
