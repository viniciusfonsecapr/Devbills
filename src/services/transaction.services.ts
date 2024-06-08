import { TransactionsRepository } from "../database/repositories/transactions.repository";
import { Transaction } from "../entities/transaction.entity";
import { CreateTransactionDTO } from "../dtos/transactions.dto";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";

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
}
