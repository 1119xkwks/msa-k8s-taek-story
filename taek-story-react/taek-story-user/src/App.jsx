import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ConfirmModal from "./components/modal/ConfirmModal.jsx";
import AlertModal from "./components/modal/AlertModal.jsx";
import useSessionRefresher from "./hooks/useSessionRefresher.jsx";

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
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {/*alert/confirm modals*/}
      <ConfirmModal />
      <AlertModal />
    </>
  );
}

export default App;
