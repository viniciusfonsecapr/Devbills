import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transaction.services";
import { CreateTransactionDTO } from "../dtos/transactions.dto";

export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, amount, type, date, categoryId } = req.body;

      const result = await this.transactionsService.create({
        title,
        amount,
        type,
        date,
        categoryId,
      });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  };
}
