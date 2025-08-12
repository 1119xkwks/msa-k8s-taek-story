import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser, selectUser } from "/src/store/sessionSlice.js";
import { apiFetch } from "/src/util/api.js";

/**
 * 페이지 이동할 때마다 회원 정보 가져오기
 */
export default function useSessionRefresher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;
    // 회원가입 페이지에서는 세션 갱신 호출을 건너뜁니다
    if (["/signup"].includes(pathname)) {
      return;
    }

    const controller = new AbortController();

    async function loadProfile() {
      try {
        const res = await apiFetch(`/user-service/users/me`, {
          method: "POST",
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
