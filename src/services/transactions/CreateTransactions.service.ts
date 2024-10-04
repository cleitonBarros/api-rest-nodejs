import { randomUUID } from "crypto";
import prismaClient from "../../database";
import { CreateTransactionBodySchema } from "../../validations/transaction.validations";

class CreateTransactionsService {
  async execute({ title, amount, type, sessionId }: CreateTransactionBodySchema) {
    if (!title || !amount || !type) {
      throw new Error("Preencha todos os campos");
    }

    if(!sessionId){
     return
    }
    
    const transaction = await prismaClient.transactions.create({
      data: {
        id: randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1,
        session_id: sessionId,
      },
    });
    return transaction;
  }
}

export { CreateTransactionsService };
