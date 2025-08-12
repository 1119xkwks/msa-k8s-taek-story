import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "/src/store/sessionSlice.js";

/**
 * 페이지 이동할 때마다 회원 정보 가져오기
 */
export default function useSessionRefresher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;
    // 로그인/회원가입 페이지에서는 세션 갱신 호출을 건너뜁니다
    if (["/login", "/signup"].includes(pathname)) {
      return;
    }

    const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || "";
    const controller = new AbortController();

    async function loadProfile() {
      try {
        const res = await fetch(`${API_BASE}/user-service/me`, {
          method: "GET",
          signal: controller.signal,
        });
        if (!res.ok) {
          dispatch(clearUser());
          return;
        }
        const profile = await res.json();
        if (profile) {
          delete profile.password;
          delete profile.pw;
        }
        dispatch(setUser(profile));
      } catch (_) {
        dispatch(clearUser());
      }
    }

    loadProfile();
    return () => controller.abort();
  }, [location.pathname, location.search, location, dispatch]);
}
