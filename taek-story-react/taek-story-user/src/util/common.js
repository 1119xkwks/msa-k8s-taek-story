import dayjs from "dayjs";

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
