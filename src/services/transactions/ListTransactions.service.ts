import prismaClient from "../../database";
import { ISessionIdProps } from "../../validations/ITransactions";

class ListTransactionsService {
  async execute({ sessionId }: ISessionIdProps) {
    const transaction = await prismaClient.transactions.findMany({
      where: {
        session_id: sessionId,
      },
    });
    return transaction;
  }
}

export { ListTransactionsService };
