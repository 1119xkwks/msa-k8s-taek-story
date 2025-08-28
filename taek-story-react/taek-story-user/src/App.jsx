import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Home from "/src/pages/Home";
import Login from "/src/pages/Login";
import SignUp from "/src/pages/SignUp";
import Profile from "/src/pages/Profile.jsx";
import Friends from "/src/pages/Friends.jsx";
import NotFound from "/src/pages/NotFound";
import ConfirmModal from "/src/components/modal/ConfirmModal.jsx";
import AlertModal from "/src/components/modal/AlertModal.jsx";
import NotificationToast from "/src/components/toast/NotificationToast.jsx";
import useSessionRefresher from "/src/hooks/useSessionRefresher.jsx";
import Notification from "./pages/Notification.jsx";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_BASE, apiFetch } from "/src/util/api.js";
import { selectUser } from "/src/store/sessionSlice.js";
import { $notificationToast } from "/src/util/notificationToast.js";
import { $alert } from "./util/modals.js";

function App() {
  // 페이지 이동시마다 세션 정보 가져오기
  useSessionRefresher();

  const user = useSelector(selectUser);
  const userMapRef = useRef({});
  const stompRef = useRef(null);

  // 사용자 정보 불러오기
  const ensureUserInfo = async (userSeq) => {
    if (!userSeq) return;
    if (userMapRef?.userSeq) return;

    try {
      const res = await apiFetch(`/user-service/users/basic-info/${userSeq}`, {
        method: "GET",
      });
      if (!res.ok) {
        await $alert("처리도중 에러가 발생하였습니다.");
        return;
      }
      const result = await res.json();
      userMapRef.current[userSeq] = result;
    } catch (_e) {
      console.error(_e);
      return;
    }
  };

  // WS을 이용한 알림 받기
  useEffect(() => {
    if (!user?.seq) {
      return;
    }

    const socketUrl = `${API_BASE}/notification-service/ws`;
    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
    });
    stompRef.current = client;

    client.onConnect = () => {
      const destination = `/topic/notifications.${user.seq}`;
      client.subscribe(destination, async (message) => {
        try {
          const payload = JSON.parse(message.body);
          let nickname = "";
          if (payload?.fromUserSeq) {
            await ensureUserInfo(payload.fromUserSeq);
          }
          nickname = userMapRef.current?.[payload.fromUserSeq]?.nickname || "";
          let msg = "새 알림이 도착했습니다.";
          if (payload?.message) {
            msg = `${nickname ? nickname : ""} ${payload?.message}`;
          }
          $notificationToast(msg);
        } catch (e) {
          console.error(e);
          $notificationToast("WS 알림 받기 실패", "fail");
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();

    return () => {
      try {
        if (stompRef.current) {
          stompRef.current.deactivate();
        }
      } catch (_) {}
      stompRef.current = null;
    };
  }, [user?.seq]);

  return (
    <>
      {/*react-router-dom*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/*alert/confirm modals*/}
      <ConfirmModal />
      <AlertModal />
      {/* [TOAST] $notificationToast(message, type); */}
      <NotificationToast />
    </>
  );
}

export default App;
