import { z } from "zod";

const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(["credit", "debit"]),
  sessionId: z.string().optional()
});

type CreateTransactionBodySchema = z.infer<typeof createTransactionBodySchema>;

const getTransactionParamsSchema = z.object({
  id: z.string().uuid(),
});

type GetTransactionParamsSchema = z.infer<typeof getTransactionParamsSchema>;

export {
  createTransactionBodySchema,
  CreateTransactionBodySchema,
  getTransactionParamsSchema,
  GetTransactionParamsSchema,
};
