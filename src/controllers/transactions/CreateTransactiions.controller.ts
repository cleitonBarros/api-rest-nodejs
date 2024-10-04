import { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionBodySchema } from "../../validations/transaction.validations";
import { CreateTransactionsService } from "../../services/transactions/CreateTransactions.service";
import { randomUUID } from "node:crypto";

class CreateTransactionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );
    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();
      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    const transactionsService = new CreateTransactionsService();
    await transactionsService.execute({ title, amount, type, sessionId });

    reply.status(201).send({ message: "done" });
  }
}
export { CreateTransactionsController };
