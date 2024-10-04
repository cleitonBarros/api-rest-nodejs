import { app } from "../src/server";
import { test, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest";
describe("Transaction (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test.skip("[POST] /transactions", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "new transactions",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  test.skip("[Get] /transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transactions",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(202);

    expect(listTransactionResponse.body).toEqual([
      expect.objectContaining({
        title: "new transactions",
        amount: 5000,
      }),
    ]);
  });

  test.skip("[Get] /transactions/:id", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transactions",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(202);
    const trasactionId = listTransactionResponse.body[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${trasactionId}`)
      .set("Cookie", cookies!)
      .expect(202);

    console.log();
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "new transactions",
        amount: 5000,
      })
    );
  });

  test("[Get] /summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "credit transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies!)
      .send({
        title: "Debit transaction",
        amount: 2000,
        type: "debit",
      });

    
    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies!)
      .expect(202);

      console.log(summaryResponse.body)

    expect(summaryResponse.body).toEqual({
      amount: 3000,
    });
  });
});
