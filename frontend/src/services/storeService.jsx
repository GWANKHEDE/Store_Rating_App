import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stores';

export const fetchStores = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return response.data;
};

export const fetchStoreDetails = async (storeId) => {
  const response = await axios.get(`${API_URL}/${storeId}`);
  return response.data;
};

export const submitStoreRating = async (storeId, rating, token) => {
  const response = await axios.post(
    `${API_URL}/rate`,
    { storeId, value: rating },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const fetchAdminStats = async (token) => {
  const response = await axios.get(`${API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchStoreOwnerStats = async (token) => {
  const response = await axios.get(`${API_URL}/dashboard/owner`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
