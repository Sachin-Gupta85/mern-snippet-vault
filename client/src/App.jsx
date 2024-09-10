import React, { useEffect, useState } from "react";
import { listSnippets, createSnippet, deleteSnippet } from "./api.js";

export default function App() {
  const [snippets, setSnippets] = useState([]);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ title: "", language: "javascript", code: "" });

  async function refresh(query = q) { setSnippets(await listSnippets(query)); }
  useEffect(() => { refresh(""); }, []);

  async function onAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.code.trim()) return;
    await createSnippet({ ...form, tags: [] });
    setForm({ title: "", language: form.language, code: "" });
    refresh();
  }

  return (
    <main style={{ maxWidth: 760, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>📦 Snippet Vault</h1>
      <form onSubmit={onAdd} style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <input aria-label="title" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input aria-label="language" placeholder="Language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
        <textarea aria-label="code" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} style={{ fontFamily: "monospace" }} />
        <button type="submit">Save snippet</button>
      </form>
      <input aria-label="search" placeholder="Search…" value={q}
        onChange={(e) => { setQ(e.target.value); refresh(e.target.value); }} style={{ width: "100%", marginBottom: 12 }} />
      {snippets.map((s) => (
        <section key={s.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8 }}>
          <strong>{s.title}</strong> <small style={{ color: "#888" }}>{s.language}</small>
          <button onClick={async () => { await deleteSnippet(s.id); refresh(); }} style={{ float: "right" }}>✕</button>
          <pre style={{ background: "#f6f6f6", padding: 8, overflowX: "auto" }}>{s.code}</pre>
        </section>
      ))}
    </main>
  );
}
