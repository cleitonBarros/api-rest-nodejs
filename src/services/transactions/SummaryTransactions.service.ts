import prismaClient from "../../database";
import { ISessionIdProps } from "../../validations/ITransactions";

class SummaryTransactionsService {
  async execute({ sessionId }: ISessionIdProps) {
    const transaction = await prismaClient.transactions.aggregate({
      where: {
        session_id: sessionId,
      },
      _sum: {
        amount: true,
      },
    });
    return { amount: transaction._sum.amount };
  }
}

export { SummaryTransactionsService };
