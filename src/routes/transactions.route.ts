import { Router } from "express";

import { ParamsType, validator } from "../middleware/validator.middleware";
import {
  createTransactionSchema,
  getDashboardSchema,
  indexTransactionSchema,
} from "../dtos/transactions.dto";
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

transactionRoutes.get(
  "/",
  validator({
    schema: indexTransactionSchema,
    type: ParamsType.QUERY,
  }),
  controller.index
);

transactionRoutes.get(
  "/dashboard",
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY,
  }),
  controller.getDashboard
);
