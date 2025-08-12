import store from "/src/store/index.js";
import {
  openConfirmModal,
  closeConfirmModal,
  setConfirmModalMsg,
  openAlertModal,
  closeAlertModal,
  setAlertModalMsg,
} from "/src/store/modalSlice.js";

let configResolver = null;

export const $confirm = (msg) => {
  // Open modal with message and return a promise that resolves on user action
  return new Promise((resolve) => {
    configResolver = resolve;
    store.dispatch(setConfirmModalMsg(msg || ""));
    store.dispatch(openConfirmModal());
  });
};

export const resolveConfirm = (value) => {
  const r = configResolver;
  configResolver = null;
  // Close first, then resolve on next tick
  store.dispatch(closeConfirmModal());
  store.dispatch(setConfirmModalMsg(""));
  if (r) setTimeout(() => r(value), 0);
};

let alertResolver = null;
export const $alert = (msg) =>
  new Promise((resolve) => {
    alertResolver = resolve;
    store.dispatch(setAlertModalMsg(msg || ""));
    store.dispatch(openAlertModal());
  });

export const resolveAlert = (value) => {
  const r = alertResolver;
  alertResolver = null;
  // Close first, then resolve on next tick
  store.dispatch(closeAlertModal());
  store.dispatch(setAlertModalMsg(""));
  if (r) setTimeout(() => r(value), 0);
};
