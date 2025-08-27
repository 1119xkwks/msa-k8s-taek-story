import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "/src/store/sessionSlice.js";
import { apiFetch } from "/src/util/api.js";

/**
 * 페이지 이동할 때마다 회원 정보 가져오기
 */
export default function useSessionRefresher() {
  const nav = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { pathname } = location;
    // 회원가입 페이지에서는 세션 갱신 호출을 건너뜁니다
    if (["/signup"].includes(pathname)) {
      return;
    }

    const controller = new AbortController();

    (async () => {
      async function loadProfile() {
        let profile = undefined;
        try {
          const res = await apiFetch(`/user-service/users/me`, {
            method: "POST",
            signal: controller.signal,
          });
          if (!res.ok) {
            dispatch(clearUser());
            return;
          }
          profile = await res.json();
          if (profile) {
            delete profile.password;
            delete profile.pw;
            dispatch(setUser(profile));
          } else {
            dispatch(clearUser());
          }
        } catch (_) {
          dispatch(clearUser());
        } finally {
          if (!profile) {
            if (!["/", "/login", "/signup"].includes(pathname)) {
              nav("/login");
            }
          }
        }
      }

      loadProfile();
    })();
    return () => controller.abort();
  }, [location.pathname, location.search, location, dispatch]);
}
