import { Router } from "express";
import { createCategorySchema } from "../dtos/categories.dto";
import { CategoriesController } from "../controllers/categories.controller";
import { ParamsType, validator } from "../middleware/validator.middleware";
import { CategoriesFactory } from "../factories/categories.factory";

export const categoriesRoutes = Router();

const controller = new CategoriesController(
  CategoriesFactory.getServiceInstance()
);

categoriesRoutes.get("/", controller.index);

categoriesRoutes.post(
  "/",
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create
);

categoriesRoutes.post(
  "/",
  validator({
    schema: createCategorySchema,
    type: ParamsType.BODY,
  }),
  controller.create
);
