const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");

class CategoryService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }

  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
    }
    const category = await this.#model.create(categoryDto);
    return category;
  }
  async find() {}
  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }
}

module.exports = new CategoryService();
