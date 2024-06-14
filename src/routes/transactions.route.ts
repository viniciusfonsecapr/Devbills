import { Router } from "express";

import { ParamsType, validator } from "../middleware/validator.middleware";
import { createTransactionSchema } from "../dtos/transactions.dto";
import { TransactionsController } from "../controllers/transactions.controller";
import { TransactionsFactory } from "../factories/transactions.factory";

export const transactionRoutes = Router();

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance()
);

transactionRoutes.post(
  "/",
  validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY,
  }),
  controller.create
);

transactionRoutes.get("/", controller.index);
