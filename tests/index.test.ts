import app from "../src/app";
import request from "supertest";
import webhookjson from "../json/webhook.json";
describe("GET /pocki", () => {
  test("Deberia responder con un mensaje de status 200 ", async () => {
    const response = await request(app).get("/pocki");
    expect(response.status).toBe(200);
  });
});

describe("POST /webhook", () => {
  test("Deberia responder con un mensaje de status 200 ", async () => {
    const response = await request(app).post("/webhook").send(webhookjson);
    expect(response.status).toBe(200);
  });

  test("El monto debe de ser positivo", async () => {
    const amountNegativo = { ...webhookjson, amount: 0 };
    const response = await request(app).post("/webhook").send(amountNegativo);
    expect(response.status).toBe(422);
    expect(response.body.error).toBe("El monto no puede ser negativo o 0");
  });

  test("Este debe de contener un correo electronico", async () => {
    const response = await request(app).post("/webhook").send(webhookjson);
    expect(response.body.data.idperson).toHaveProperty("email");
  });
});
