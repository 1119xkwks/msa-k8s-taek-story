import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "/src/pages/Home";
import Login from "/src/pages/Login";
import SignUp from "/src/pages/SignUp";
import Profile from "/src/pages/Profile.jsx";
import Friends from "/src/pages/Friends.jsx";
import NotFound from "/src/pages/NotFound";
import ConfirmModal from "/src/components/modal/ConfirmModal.jsx";
import AlertModal from "/src/components/modal/AlertModal.jsx";
import useSessionRefresher from "/src/hooks/useSessionRefresher.jsx";
import Notification from "./pages/Notification.jsx";

function App() {
  // 페이지 이동시마다 세션 정보 가져오기
  useSessionRefresher();

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
    </>
  );
}

export default App;
