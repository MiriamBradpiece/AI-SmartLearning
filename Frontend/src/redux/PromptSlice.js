import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  categoryId: null,
  subCategoryId: null,
  promptText: '',
};

const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setPromptData: (state, action) => {
      state.userId = action.payload.userId;
      state.categoryId = action.payload.categoryId;
      state.subCategoryId = action.payload.subCategoryId;
      state.promptText = action.payload.promptText;
    },
    clearPromptData: (state) => {
      state.userId = null;
      state.categoryId = null;
      state.subCategoryId = null;
      state.promptText = '';
    }
  },
});

export const { setPromptData, clearPromptData } = promptSlice.actions;
export default promptSlice.reducer;