import { configureStore } from "@reduxjs/toolkit";
import feelingsReducer from "./feelingsSlice.js";
import uiReducer from "./modalSlice.js";

const store = configureStore({
  reducer: {
    feelings: feelingsReducer,
    ui: uiReducer,
  },
});

export default store;
