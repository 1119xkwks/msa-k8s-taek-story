import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmModalOpen: false,
  confirmModalMsg: "",
  alertModalOpen: false,
  alertModalMsg: "",
};

const modalSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openConfirmModal(state) {
      state.confirmModalOpen = true;
    },
    closeConfirmModal(state) {
      state.confirmModalOpen = false;
    },
    setConfirmModalOpen(state, action) {
      state.confirmModalOpen = Boolean(action.payload);
    },
    setConfirmModalMsg(state, action) {
      state.confirmModalMsg = String(action.payload);
    },
    openAlertModal(state) {
      state.alertModalOpen = true;
    },
    closeAlertModal(state) {
      state.alertModalOpen = false;
    },
    setAlertModalOpen(state, action) {
      state.alertModalOpen = Boolean(action.payload);
    },
    setAlertModalMsg(state, action) {
      state.alertModalMsg = String(action.payload);
    },
  },
});

export const {
  openConfirmModal,
  closeConfirmModal,
  setConfirmModalOpen,
  setConfirmModalMsg,
  openAlertModal,
  closeAlertModal,
  setAlertModalOpen,
  setAlertModalMsg,
} = modalSlice.actions;
export const selectConfirmModalOpen = (state) => state.ui.confirmModalOpen;
export const selectConfirmModalMsg = (state) => state.ui.confirmModalMsg;
export const selectAlertModalOpen = (state) => state.ui.alertModalOpen;
export const selectAlertModalMsg = (state) => state.ui.alertModalMsg;
export default modalSlice.reducer;
