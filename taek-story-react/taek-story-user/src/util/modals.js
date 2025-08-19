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
    console.debug("[$confirm] open", msg);
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
  if (r) {
    console.debug("[resolveConfirm] value=", value);
    setTimeout(() => r(value), 0);
  }
};

let alertResolver = null;
export const $alert = (msg) =>
  new Promise((resolve) => {
    console.debug("[$alert] open", msg);
    alertResolver = resolve;
    store.dispatch(setAlertModalMsg(msg || ""));
    store.dispatch(openAlertModal());
  });

export const resolveAlert = (value) => {
  const r = alertResolver;
  alertResolver = null;
  console.debug("[resolveAlert] value=", value);
  // Resolve immediately to avoid any race with modal closing
  if (r) r(value);
  // Then close modal state
  store.dispatch(closeAlertModal());
  store.dispatch(setAlertModalMsg(""));
};
