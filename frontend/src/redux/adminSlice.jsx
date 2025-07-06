import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchAdminStats, 
  fetchAllUsers, 
  fetchAllStores,
  createNewUser,
  createNewStore
} from '../services/adminService';

const initialState = {
  stats: null,
  users: [],
  stores: [],
  status: 'idle', 
  error: null
};

export const getAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      return await fetchAdminStats(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (filters, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      return await fetchAllUsers(token, filters);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllStores = createAsyncThunk(
  'admin/fetchStores',
  async (filters, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      return await fetchAllStores(token, filters);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  'admin/createUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      return await createNewUser(token, userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStore = createAsyncThunk(
  'admin/createStore',
  async (storeData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      return await createNewStore(token, storeData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: () => initialState,
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminStats.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(getAllStores.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(getAllStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(addUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.unshift(action.payload); 
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      .addCase(addStore.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores.unshift(action.payload); 
      })
      .addCase(addStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetAdminState, clearAdminError } = adminSlice.actions;

export default adminSlice.reducer;

export const selectAdminStats = (state) => state.admin.stats;
export const selectAllUsers = (state) => state.admin.users;
export const selectAllStores = (state) => state.admin.stores;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;
