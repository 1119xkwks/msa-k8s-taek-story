import "./NotificationToast.css";

import ToastItem from "./ToastItem.jsx";
import { useSelector } from "react-redux";
import { selectNotificationToasts } from "/src/store/notificationToastSlice.js";

const NotificationToast = () => {
  const items = useSelector(selectNotificationToasts);
  return (
    <div className="notification-toast">
      {items.map((t) => (
        <ToastItem key={t.id} type={t.type} content={t.content} id={t.id} />
      ))}
    </div>
  );
};

export default NotificationToast;
