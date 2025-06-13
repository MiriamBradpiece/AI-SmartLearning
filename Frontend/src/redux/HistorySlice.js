import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// thunk לקבלת ההיסטוריה לפי userId
export const fetchPrompts = createAsyncThunk(
  'history/fetchPrompts',
  async (userId, thunkAPI) => {
    const response = await fetch(`https://localhost:7173/api/Prompt/get-history?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch prompts');
    }
    return await response.json();
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    arrPrompts: [],
    loading: false,
    error: null
  },
  reducers: {
    setPrompts(state, action) {
      state.arrPrompts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.arrPrompts = action.payload;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching prompts";
      });
  }
});

export const { setPrompts } = historySlice.actions;
export default historySlice.reducer;