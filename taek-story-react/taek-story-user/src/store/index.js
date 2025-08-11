import { configureStore } from "@reduxjs/toolkit";
import feelingsReducer from "./feelingsSlice.js";
import uiReducer from "./modalSlice.js";
import sessionReducer from "./sessionSlice.js";

const store = configureStore({
  reducer: {
    feelings: feelingsReducer,
    ui: uiReducer,
    session: sessionReducer,
  },
});

export default store;
