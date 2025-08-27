import store from "/src/store/index.js";
import { enqueueToast } from "/src/store/notificationToastSlice.js";

let nextId = 1;

export const $notificationToast = (message, type = "success") => {
  if (!message) return;
  const id = nextId++;
  store.dispatch(
    enqueueToast({ id, type: String(type || "success"), content: String(message) })
  );
  return id;
};


