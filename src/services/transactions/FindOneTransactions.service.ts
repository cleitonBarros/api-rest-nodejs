import prismaClient from "../../database";
import { IListTransactionProps } from "../../validations/ITransactions";

class FindOneTransactionsService {
  async execute({ id, sessionId }: IListTransactionProps) {
    const transaction = await prismaClient.transactions.findUnique({
      where: {
        id: id,
        session_id: sessionId
      },
    });
    return transaction;
  }
}

export { FindOneTransactionsService };
