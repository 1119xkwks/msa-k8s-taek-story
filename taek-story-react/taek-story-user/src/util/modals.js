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
  try {
    if (configResolver) {
      const r = configResolver;
      configResolver = null;
      r(value);
    }
  } finally {
    // Always close and clear message
    store.dispatch(closeConfirmModal());
    store.dispatch(setConfirmModalMsg(""));
  }
};

let alertResolver = null;
export const $alert = (msg) =>
  new Promise((resolve) => {
    alertResolver = resolve;
    store.dispatch(setAlertModalMsg(msg || ""));
    store.dispatch(openAlertModal());
  });

export const resolveAlert = (value) => {
  try {
    if (alertResolver) {
      const r = alertResolver;
      alertResolver = null;
      r(value);
    }
  } finally {
    store.dispatch(closeAlertModal());
    store.dispatch(setAlertModalMsg(""));
  }
};
