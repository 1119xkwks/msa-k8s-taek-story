export function formatRelativeTime(isoString) {
  try {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "방금 전";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}시간 전`;
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 7) return `${diffDay}일 전`;
    return date.toLocaleDateString();
  } catch (e) {
    return "";
  }
}
