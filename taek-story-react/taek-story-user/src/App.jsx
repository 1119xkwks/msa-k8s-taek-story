import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ConfirmModal from "./components/modal/ConfirmModal.jsx";
import AlertModal from "./components/modal/AlertModal.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ConfirmModal />
      <AlertModal />
    </>
  );
}

export default App;
