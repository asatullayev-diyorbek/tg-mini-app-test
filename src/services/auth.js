import axios from 'axios';

const API_URL = 'https://ora-splittable-illuminatedly.ngrok-free.dev/api/v1';

export const login = async (initData) => {
  try {
    console.log('Sending initData to backend...');

    const body = new URLSearchParams();
    body.append('initData', initData);

    const response = await axios.post(
      `${API_URL}/login/`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { accessToken, refreshToken, user } = response.data;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response.data;
  } catch (error) {
    console.error(
      'Login failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const logout = () => {
  localStorage.clear();
};
