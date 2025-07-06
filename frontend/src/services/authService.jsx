import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = error.response.data.errors.map(err => err.message);
      throw new Error(errorMessages.join(', '));
    }
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const changePassword = async (data, token) => {
  const response = await axios.post(
    `${API_URL}/change-password`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
