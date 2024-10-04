import { FastifyReply, FastifyRequest } from "fastify";
import { SummaryTransactionsService } from "../../services/transactions/SummaryTransactions.service";

class SummaryTransactionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies;
    if (!sessionId) return;
    const transactionsService = new SummaryTransactionsService();
    const transaction = await transactionsService.execute({ sessionId });

    reply.status(202).send(transaction);
  }
}
export { SummaryTransactionsController };
