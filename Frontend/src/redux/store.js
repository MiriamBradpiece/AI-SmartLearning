import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './RegisterSlice';
import categoriesReducer from './categorySlice';
import subCategoriesSlice from './subCategories';
import loginSlice from './loginSlice';
import historySlice from './HistorySlice';
import promptSlice from './PromptSlice';
const store = configureStore({
// store.js

  reducer: {
    login: loginSlice,
    register: registerReducer,
    categories: categoriesReducer,
    subCategories: subCategoriesSlice,
    history: historySlice,
    prompt: promptSlice  // <-- נכון!
  },

});

export default store;