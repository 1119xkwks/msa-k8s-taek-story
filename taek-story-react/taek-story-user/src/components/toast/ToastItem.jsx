import { Toast, ToastToggle } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { removeToast } from "/src/store/notificationToastSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToastItem = ({ id, type, content }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [iconColorName, setIconColorName] = useState(
    " bg-green-100 text-green-500",
  );
  const [theIcon, setTheIcon] = useState(faCheck);

  switch (type) {
    case "fail":
    case "failed":
      setIconColorName("bg-red-100 text-red-500");
      setTheIcon(faXmark);
      break;
    case "warn":
    case "warning":
      setIconColorName("bg-orange-100 text-orange-500");
      setTheIcon(faExclamation);
      break;
  }

  const contentClick = async () => {
    dispatch(removeToast(id));
    nav("/notification", { state: { refreshAt: Date.now() } });
  };

  return (
    <Toast>
      <div
        className={`cursor-pointer inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                    ${iconColorName}`}
        onClick={() => contentClick()}
      >
        <FontAwesomeIcon icon={theIcon} className="h-5 w-5" />
      </div>
      <div
        className="cursor-pointer ml-3 text-sm font-normal"
        onClick={() => contentClick()}
      >
        {content}
      </div>
      <ToastToggle onDismiss={() => dispatch(removeToast(id))} />
    </Toast>
  );
};

export default ToastItem;
