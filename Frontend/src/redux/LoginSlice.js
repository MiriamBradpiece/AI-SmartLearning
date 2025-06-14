import { createSlice } from '@reduxjs/toolkit';
import { GetUser } from '../../api'; // ייבוא תקין של הפונקציה

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    name: '',
    id: '',
    loading: false,
    error: null,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload.name;
        state.id = action.payload.id;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setName, setId } = loginSlice.actions;
export default loginSlice.reducer;