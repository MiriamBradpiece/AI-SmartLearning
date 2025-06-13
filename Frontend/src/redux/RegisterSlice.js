import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  userName: '',
  phoneNumber: ''
};

export const registerSlice = createSlice({
  name: 'Register',
  initialState:{
    id: '',
    userName: '',
    phoneNumber: ''
  },
  reducers: {
    SetId: (state, action) => {
      state.id = action.payload;
    },
    SetUserName: (state, action) => {
      state.userName = action.payload;
    },
    SetPhonNumber: (state, action) => {
      state.phoneNumber = action.payload;
    }
  }
});

export const { SetId, SetUserName, SetPhonNumber } = registerSlice.actions;

export default registerSlice.reducer;