import { createSlice } from '@reduxjs/toolkit';
import { RegisterUser } from '../../api'; // Ensure correct import

const initialState = {
  id: '',
  userName: '',
  phoneNumber: '',
  loading: false,
  error: null,
};

export const registerSlice = createSlice({
  name: 'Register',
  initialState,
  reducers: {
    SetId: (state, action) => {
      state.id = action.payload;
    },
    SetUserName: (state, action) => {
      state.userName = action.payload;
    },
    SetPhonNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.userName = action.payload.userName;
        state.phoneNumber = action.payload.phoneNumber;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { SetId, SetUserName, SetPhonNumber } = registerSlice.actions;
export default registerSlice.reducer;