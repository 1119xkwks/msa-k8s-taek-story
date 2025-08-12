import dayjs from "dayjs";
import { apiFetch } from "./api.js";
import { useNavigate } from "react-router-dom";

export function formatRelativeTime(isoOrPlainString) {
  try {
    const d = dayjs(isoOrPlainString);
    if (!d.isValid()) return "";
    const now = dayjs();
    const diffSec = now.diff(d, "second");
    if (diffSec < 60) return "방금 전";
    const diffMin = now.diff(d, "minute");
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHr = now.diff(d, "hour");
    if (diffHr < 24) return `${diffHr}시간 전`;
    const diffDay = now.diff(d, "day");
    if (diffDay < 7) return `${diffDay}일 전`;
    return d.format("YYYY-MM-DD");
  } catch (e) {
    return "";
  }
}

export async function signOut() {
  console.debug("signOut called.");
  const navigate = useNavigate();
  const response = await apiFetch(`/user-service/users/signout`, {
    method: "POST",
    credentials: "include",
  });
  if (response.ok) {
    navigate("/");
  }
}
