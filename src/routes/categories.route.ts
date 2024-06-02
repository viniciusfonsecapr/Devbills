import { Router } from "express";
import { createCategorySchema } from "../dtos/categories.dto";
import { CategoriesController } from "../controllers/categories.controller";
import { ParamsType, validator } from "../middleware/validator.middleware";

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.get("/", controller.index);

categoriesRoutes.post(
  "/",
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create
);
