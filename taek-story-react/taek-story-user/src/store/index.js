import { configureStore } from "@reduxjs/toolkit";
import feelingsReducer from "/src/store/feelingsSlice.js";
import uiReducer from "/src/store/modalSlice.js";
import sessionReducer from "/src/store/sessionSlice.js";
import notificationToastReducer from "/src/store/notificationToastSlice.js";

const store = configureStore({
  reducer: {
    feelings: feelingsReducer,
    ui: uiReducer,
    session: sessionReducer,
    notificationToast: notificationToastReducer,
  },
});

export default store;
