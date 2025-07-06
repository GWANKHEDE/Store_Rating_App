import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const fetchAdminStats = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.stats;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || error.response.data.message;
    }
    throw new Error('Failed to fetch admin stats');
  }
};

export const fetchAllUsers = async (token, filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await axios.get(`${API_URL}/users?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.users;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || error.response.data.message;
    }
    throw new Error('Failed to fetch users');
  }
};

export const fetchAllStores = async (token, filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await axios.get(`${API_URL}/stores?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.stores;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.error || error.response.data.message;
    }
    throw new Error('Failed to fetch stores');
  }
};

export const createNewUser = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message);
        throw errorMessages.join(', ');
      }
      throw error.response.data.error || error.response.data.message;
    }
    throw new Error('Failed to create user');
  }
};

export const createNewStore = async (token, storeData) => {
  try {
    const response = await axios.post(`${API_URL}/stores`, storeData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.store;
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message);
        throw errorMessages.join(', ');
      }
      throw error.response.data.error || error.response.data.message;
    }
    throw new Error('Failed to create store');
  }
};
