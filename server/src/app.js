const express = require("express");
const cors = require("cors");
const snippets = require("./routes/snippets");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/snippets", snippets);

module.exports = app;
