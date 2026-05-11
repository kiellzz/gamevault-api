import request from "supertest";
import app from "../app";

describe("GameVault API", () => {
  let token: string;
  let gameId: number;

  // Evita conflito com banco “sujo” (usuário já existente)
  const email = `test_${Date.now()}@test.com`;
  const password = "123456";

  it("GET /health → deve retornar status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("POST /api/users/register → deve criar um usuário", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "Test User",
      email,
      password,
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
  });

  it("POST /api/users/login → deve retornar token", async () => {
    const res = await request(app).post("/api/users/login").send({
      email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("POST /api/games → deve criar um jogo", async () => {
    const res = await request(app)
      .post("/api/games")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "God of War",
        genre: "Action",
        platform: "PlayStation",
        releaseYear: 2018,
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("God of War");
    gameId = res.body.id;
  });

  it("GET /api/games → deve retornar lista de jogos", async () => {
    const res = await request(app).get("/api/games");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/games/:id/collection → deve adicionar na coleção", async () => {
    const res = await request(app)
      .post(`/api/games/${gameId}/collection`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "playing" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("playing");
  });

  it("POST /api/games/:id/review → deve avaliar o jogo", async () => {
    const res = await request(app)
      .post(`/api/games/${gameId}/review`)
      .set("Authorization", `Bearer ${token}`)
      .send({ rating: 9, content: "Incrível!" });

    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(9);
  });

  it("POST /api/users/register → deve retornar 400 com dados inválidos", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "",
      email: "emailinvalido",
      password: "123",
    });

    expect(res.status).toBe(400);
    expect(res.body.erros).toBeDefined();
  });

  it("GET /api/games/99999 → deve retornar 404", async () => {
    const res = await request(app).get("/api/games/99999");
    expect(res.status).toBe(404);
  });
});