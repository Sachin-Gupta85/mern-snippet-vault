const express = require("express");
const Snippet = require("../models/Snippet");

const router = express.Router();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get("/", async (req, res) => {
  const { q, language, tag } = req.query;
  const query = {};
  if (q) {
    const rx = { $regex: esc(q), $options: "i" };
    query.$or = [{ title: rx }, { code: rx }, { tags: rx }];
  }
  if (language) query.language = language.toLowerCase();
  if (tag) query.tags = tag;
  res.json(await Snippet.find(query).sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const { title, language, code, tags = [] } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: "title required" });
  if (!language || !language.trim()) return res.status(400).json({ error: "language required" });
  if (!code) return res.status(400).json({ error: "code required" });
  const s = await Snippet.create({ title: title.trim(), language, code, tags });
  res.status(201).json(s);
});

router.get("/:id", async (req, res) => {
  const s = await Snippet.findById(req.params.id);
  if (!s) return res.status(404).json({ error: "not found" });
  res.json(s);
});

router.put("/:id", async (req, res) => {
  const s = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!s) return res.status(404).json({ error: "not found" });
  res.json(s);
});

router.delete("/:id", async (req, res) => {
  const s = await Snippet.findByIdAndDelete(req.params.id);
  if (!s) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

module.exports = router;
