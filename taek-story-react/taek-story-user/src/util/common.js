import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isoWeek from "dayjs/plugin/isoWeek";
import { API_BASE, apiFetch } from "/src/util/api.js";
import { useNavigate } from "react-router-dom";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

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

/**
 * 날짜를 기준으로 "today", "lastweek", "old" 판별
 * @param {string} dateStr - "2025-08-11T02:22:29.664" 형태의 문자열 날짜
 * @returns {"today" | "lastweek" | "old"}
 */
export function classifyDate(dateStr) {
  const targetDate = dayjs(dateStr);
  const today = dayjs();

  // 오늘인지 확인
  if (targetDate.isSame(today, "day")) {
    return "today";
  }

  // 이번 주인지 확인 (ISO Week 기준: 월~일)
  const startOfWeek = today.startOf("isoWeek"); // 이번 주 월요일
  if (targetDate.isSameOrAfter(startOfWeek, "day")) {
    return "lastweek";
  }

  // 그 외
  return "old";
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

export function makeMyProfileSrc(user) {
  if (!user?.fileProfileSeq) return; // 아직 세션 없음
  const { fileProfileSeq } = user; // 필요 키 사용
  return `${API_BASE}/file-service/file/image/content/${fileProfileSeq}`;
}
