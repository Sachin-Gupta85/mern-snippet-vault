# 📦 mern-snippet-vault — code snippet manager (MERN + Python)

> Save code snippets with language and tags; search across title/code/tags. **React** + **Express** + **MongoDB**, with a **Python** relevance-ranking tool and a cross-stack test harness.

![React](https://img.shields.io/badge/React-18-61dafb)
![Express](https://img.shields.io/badge/Express-4-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248)
![Tests](https://img.shields.io/badge/tests-jest%20%2B%20pytest%20%2B%20vitest-brightgreen)

## ✨ Features
- CRUD snippets with a lowercased `language`; search over title/code/tags (`?q=`),
  filter by `?language=` and `?tag=`.
- **Python companion** (`pytools/search.py`): weighted relevance ranking
  (title > tag > code), unit-tested with pytest.
- Express API tested with Jest + mongodb-memory-server.

## 🚀 Run
```bash
docker compose up --build
cd client && npm install && npm run dev
```

## ✅ Test
```bash
./run_harness.sh      # jest (3) + pytest (3) + vitest (1)
```

## 🔌 API
`GET /api/snippets?q=&language=&tag=` · `POST /api/snippets` ·
`GET|PUT /api/snippets/{id}` · `DELETE /api/snippets/{id}`

## 📝 License
MIT — see [LICENSE](LICENSE).
