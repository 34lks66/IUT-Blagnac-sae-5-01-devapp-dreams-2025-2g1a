const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getCookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="))
    ?.split("=")[1];
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  let res = await fetch(API_BASE_URL + path, {
    ...options,
    credentials: "include",
  });

  // Si pas 401/403 → on retourne juste la réponse
  if (res.status !== 401 && res.status !== 403) {
    return res;
  }

  console.warn("Token expiré, tentative de refresh...");

  // Tentative de refresh
  const xsrf = getCookie("XSRF-TOKEN");
  if (!xsrf) {
    console.warn("Pas de XSRF → redirection logout");
    window.location.href = "/login";
    return res;
  }

  const refreshRes = await fetch(API_BASE_URL + "/api/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrf,
    },
  });

  // Si le refresh échoue → logout immédiat
  if (!refreshRes.ok) {
    console.warn("Refresh refusé → redirection logout");
    window.location.href = "/login";
    return res;
  }

  console.log("Refresh OK → nouvelle tentative");

  // Nouvelle tentative après refresh
  res = await fetch(API_BASE_URL + path, {
    ...options,
    credentials: "include",
  });

  // Si la nouvelle tentative renvoie encore 401/403 → logout
  if (res.status === 401 || res.status === 403) {
    window.location.href = "/login";
  }

  return res;
}