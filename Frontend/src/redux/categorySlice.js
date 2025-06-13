import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// כאן את משנה ל-URL האמיתי של ה-API שלך
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    const response = await fetch('https://localhost:7173/api/Category');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    loading: false,
    error: null,
    selectedCategoryId: null,
  },
  reducers: {
    setSelectedCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategoryId } = categorySlice.actions;
export default categorySlice.reducer;