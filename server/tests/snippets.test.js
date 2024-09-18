const request = require("supertest");
const app = require("../src/app");

const mk = (o = {}) => ({ title: "Debounce", language: "JavaScript", code: "const x=1", tags: ["util"], ...o });

describe("snippets API", () => {
  test("create validates and lowercases language", async () => {
    expect((await request(app).post("/api/snippets").send(mk({ title: "" }))).status).toBe(400);
    expect((await request(app).post("/api/snippets").send(mk({ code: "" }))).status).toBe(400);
    const res = await request(app).post("/api/snippets").send(mk());
    expect(res.status).toBe(201);
    expect(res.body.language).toBe("javascript");
  });

  test("search across title/code/tags and filter by language", async () => {
    await request(app).post("/api/snippets").send(mk({ title: "Quicksort", language: "python", code: "def qs()", tags: ["algo"] }));
    await request(app).post("/api/snippets").send(mk({ title: "Fetch wrapper", language: "javascript", code: "fetch()", tags: ["http"] }));
    expect((await request(app).get("/api/snippets?q=quick")).body.length).toBe(1);
    expect((await request(app).get("/api/snippets?q=fetch")).body.length).toBe(1);
    expect((await request(app).get("/api/snippets?language=python")).body.length).toBe(1);
    expect((await request(app).get("/api/snippets?tag=algo")).body.length).toBe(1);
  });

  test("update and delete and 404", async () => {
    const { body } = await request(app).post("/api/snippets").send(mk());
    expect((await request(app).put(`/api/snippets/${body.id}`).send({ title: "Renamed" })).body.title).toBe("Renamed");
    expect((await request(app).delete(`/api/snippets/${body.id}`)).status).toBe(204);
    expect((await request(app).get(`/api/snippets/${body.id}`)).status).toBe(404);
  });
});
