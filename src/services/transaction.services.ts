import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { Transaction } from "../entities/transaction.entity";
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  IndexTransactionDTO,
} from "../dtos/transactions.dto";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";
import { Balance } from "../entities/balance.entity";

export class TransactionsService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async create({
    title,
    type,
    date,
    categoryId,
    amount,
  }: CreateTransactionDTO): Promise<Transaction> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError("Category does not exists", StatusCodes.NOT_FOUND);
    }

    const transaction = new Transaction({
      title,
      type,
      date,
      category,
      amount,
    });

    const createdTransaction = await this.transactionsRepository.create(
      transaction
    );

    return createdTransaction;
  }

  async index(filters: IndexTransactionDTO): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.index(filters);

    return transactions;
  }

  async getDashboard({ beginDate, endDate }: GetDashboardDTO) {
    let balance = await this.transactionsRepository.getBalance({
      beginDate,
      endDate,
    });

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0,
      });
    }
    return balance;
  }
}
