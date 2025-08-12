export const API_BASE =
  (import.meta.env && import.meta.env.VITE_API_BASE) || "";

export const apiFetch = (path, options = {}) => {
  // Same-origin when absolute path to leverage Vite dev proxy
  let url;
  if (path.startsWith("http")) {
    url = path;
  } else {
    url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  }
  const finalOptions = { credentials: "include", ...options };
  return fetch(url, finalOptions);
};
