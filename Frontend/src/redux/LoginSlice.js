
// import { createSlice } from '@reduxjs/toolkit';

// const loginSlice = createSlice({
//   name: 'login',
//   initialState: {
//     name: '',
//     id: ''
//   },
//   reducers: {
    
//   },
// });

// export default loginSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    name: '',
    id: ''
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setName, setId } = loginSlice.actions;
export default loginSlice.reducer;
