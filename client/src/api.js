const BASE = import.meta.env?.VITE_API_URL || "";
async function req(path, opts) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" }, ...opts });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.status === 204 ? null : res.json();
}
export const listSnippets = (q = "", language = "") => {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (language) p.set("language", language);
  const qs = p.toString();
  return req(`/snippets${qs ? `?${qs}` : ""}`);
};
export const createSnippet = (s) => req("/snippets", { method: "POST", body: JSON.stringify(s) });
export const deleteSnippet = (id) => req(`/snippets/${id}`, { method: "DELETE" });
