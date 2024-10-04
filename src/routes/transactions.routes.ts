import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { CreateTransactionsController } from "../controllers/transactions/CreateTransactiions.controller";
import { ListTransactionsController } from "../controllers/transactions/ListTransactiions.controller";
import { FindOneTransactionsController } from "../controllers/transactions/FindOneTransactiions.controller";
import { SummaryTransactionsController } from "../controllers/transactions/SummaryTransactiions.controller";
import { CheckSessionIdExists } from "../middlewares/checkSessionIdExists";

export async function transactionsRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/",
    { preHandler: [CheckSessionIdExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListTransactionsController().handle(request, reply);
    }
  );
  fastify.get(
    "/:id",
    { preHandler: [CheckSessionIdExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new FindOneTransactionsController().handle(request, reply);
    }
  );
  fastify.get(
    "/summary",
    { preHandler: [CheckSessionIdExists] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new SummaryTransactionsController().handle(request, reply);
    }
  );
  fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateTransactionsController().handle(request, reply);
  });
}
