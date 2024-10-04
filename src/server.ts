import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie  from "@fastify/cookie"
import { transactionsRoutes } from "./routes/transactions.routes";

export const app = Fastify();

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors);
  await app.register(cookie)
  await app.register(transactionsRoutes, { prefix: "transactions" });
  try {
    await app.listen({ port: 3333 });
  } catch (error) {
    console.log(error)
  }
};

start();
