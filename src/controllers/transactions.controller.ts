import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionsService } from "../services/transaction.services";
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  IndexTransactionDTO,
} from "../dtos/transactions.dto";

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

  index = async (
    req: Request<unknown, unknown, unknown, IndexTransactionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, beginDate, endDate, categoryId } = req.query;

      const result = await this.transactionsService.index({
        title,
        beginDate,
        endDate,
        categoryId,
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };

  getDashboard = async (
    req: Request<unknown, unknown, unknown, GetDashboardDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { beginDate, endDate } = req.query;

      const result = await this.transactionsService.getDashboard({
        beginDate,
        endDate,
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  };
}
