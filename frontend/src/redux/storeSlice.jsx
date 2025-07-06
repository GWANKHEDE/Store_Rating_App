import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchStores, 
  fetchStoreDetails, 
  submitStoreRating,
  fetchAdminStats,
  fetchStoreOwnerStats
} from '../services/storeService';

const initialState = {
  stores: [],
  currentStore: null,
  stats: null,
  status: 'idle',
  error: null
};

export const getStores = createAsyncThunk('stores/fetchAll', async (filters, { rejectWithValue }) => {
  try {
    return await fetchStores(filters);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getStoreDetails = createAsyncThunk('stores/fetchDetails', async (storeId, { rejectWithValue }) => {
  try {
    return await fetchStoreDetails(storeId);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const rateStore = createAsyncThunk('stores/rate', async ({ storeId, rating }, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    return await submitStoreRating(storeId, rating, token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getAdminStats = createAsyncThunk('stores/adminStats', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    return await fetchAdminStats(token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getStoreOwnerStats = createAsyncThunk('stores/ownerStats', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    return await fetchStoreOwnerStats(token);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    clearStore: (state) => {
      state.currentStore = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getStoreDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentStore = action.payload;
      })
      .addCase(getStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(rateStore.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(rateStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.currentStore) {
          state.currentStore.userRating = action.payload.rating;
        }
      })
      .addCase(rateStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAdminStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getStoreOwnerStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStoreOwnerStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(getStoreOwnerStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearStore } = storeSlice.actions;
export default storeSlice.reducer;
