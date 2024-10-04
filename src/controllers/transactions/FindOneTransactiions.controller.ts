import { FastifyReply, FastifyRequest } from "fastify";
import { getTransactionParamsSchema } from "../../validations/transaction.validations";
import { FindOneTransactionsService } from "../../services/transactions/FindOneTransactions.service";

class FindOneTransactionsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = getTransactionParamsSchema.parse(request.params);
    const { sessionId } = request.cookies;

    if (!sessionId) return;
    const transactionsService = new FindOneTransactionsService();
    const transaction = await transactionsService.execute({ id, sessionId });

    reply.status(202).send({ transaction });
  }
}
export { FindOneTransactionsController };
