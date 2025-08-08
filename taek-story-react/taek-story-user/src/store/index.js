import { configureStore } from '@reduxjs/toolkit';
import feelingsReducer from './feelingsSlice.js';

const store = configureStore({
  reducer: {
    feelings: feelingsReducer,
  },
});

export default store;


