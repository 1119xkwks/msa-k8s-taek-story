import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const notificationToastSlice = createSlice({
  name: "notificationToast",
  initialState,
  reducers: {
    enqueueToast(state, action) {
      const { id, type, content } = action.payload;
      state.items.push({ id, type, content });
    },
    removeToast(state, action) {
      const id = action.payload;
      state.items = state.items.filter((t) => t.id !== id);
    },
    clearToasts(state) {
      state.items = [];
    },
  },
});

export const { enqueueToast, removeToast, clearToasts } =
  notificationToastSlice.actions;

export const selectNotificationToasts = (state) => state.notificationToast.items;

export default notificationToastSlice.reducer;


