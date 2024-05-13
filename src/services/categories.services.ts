import { Category } from "../entities/category.entity";

export class CategoriesServices {
  async create(): Promise<Category> {
    const category = new Category({
      title: "example Category",
      color: "#ff33bb",
    });

    return category;
  }
}
