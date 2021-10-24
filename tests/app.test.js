import app from "../src/app";
import supertest from "supertest";
import connection from "../src/database/database";

describe("POST /users", () => {
  it("returns status 201 for valid params on register", async () => {
    const body = { name: "Jhonatan", email: "jhonatan@hotmail.com", password: "123" };

    const result = await supertest(app).post("/users").send(body);
    expect(result.status).toEqual(201);
  });

  it("return status 409 for duplicated emails", async () => {
    const body = { name: "Jhonatan", email: "jhonatan@hotmail.com", password: "123" };

    const firstEntry = await supertest(app).post("/users").send(body);
    expect(firstEntry.status).toEqual(201);

    const secondEntry = await supertest(app).post("/users").send(body);
    expect(secondEntry.status).toEqual(409);
  });
});

describe("POST /userLogin", () => {
  it("returns status 409 for invalid user", async () => {
    const body = { name: "Jhonatan", email: "jhonatan@hotmail.com", password: "123" };
    const wrongBody = { name: "Jhonatan", email: "jhonatan@hotmail.com", password: "12" };

    const register = await supertest(app).post("/users").send(body);
    expect(register.status).toEqual(201);

    const login = await supertest(app).post("/userLogin").send(body);
    expect(login.status).toEqual(201);

    const wrongLogin = await supertest(app).post("/userLogin").send(wrongBody);
    expect(wrongLogin.status).toEqual(401);
  });
});

describe("POST /deleteSession", () => {
  it("returns status 201 for deleted session", async () => {
    const body = { name: "Jhonatan", email: "jhonatan@hotmail.com", password: "123" };

    const register = await supertest(app).post("/users").send(body);
    expect(register.status).toEqual(201);

    const login = await supertest(app).post("/userLogin").send(body);
    expect(login.status).toEqual(201);

    const validToken = { token: login.text };

    const deleteSession = await supertest(app).post("/deleteSession").send(validToken);
    expect(deleteSession.status).toEqual(201);
  });
});

beforeEach(async () => {
  await connection.query("DELETE FROM users");
  await connection.query("DELETE FROM sessions");
});

afterAll(() => {
  connection.end();
});
