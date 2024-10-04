import { FastifyReply, FastifyRequest } from "fastify";
import { ListTransactionsService } from "../../services/transactions/ListTransactions.service";

class ListTransactionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies;
    if (!sessionId) return;
    const transactionsService = new ListTransactionsService();
    const transaction = await transactionsService.execute({ sessionId });

    reply.status(202).send(transaction);
  }
}
export { ListTransactionsController };
