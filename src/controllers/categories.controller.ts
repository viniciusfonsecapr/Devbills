import { Request, Response } from "express";
import { CategoriesServices } from "../services/categories.services";

export class CategoriesController {
  async create(_: Request, res: Response) {
    const service = new CategoriesServices();

    const result = await service.create();

    return res.status(201).json(result);
  }
}
