import { createSlice } from '@reduxjs/toolkit';

import { fetchSubCategories } from '../../api';

const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState: {
    items: [],
    loading: false,
    error: '',
    selectedId: null,
    note: '', // שדה חדש
  },
  reducers: {
    setSelectedSubCategoryId: (state, action) => {
      state.selectedId = action.payload;
    },
    clearSubCategories: (state) => {
      state.items = [];
      state.error = '';
      state.loading = false;
      state.selectedId = null;
      state.note = '';
    },
    setNote: (state, action) => { // אקשן חדש
      state.note = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.items = [];
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.items = [];
      });
  },
});

export const {
  setSelectedSubCategoryId,
  clearSubCategories,
  setNote, // ייצוא האקשן החדש
} = subCategoriesSlice.actions;

export default subCategoriesSlice.reducer;