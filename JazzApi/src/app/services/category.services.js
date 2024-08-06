const Category = require('../models/Category');
const { CategoryNotFoundError, DatabaseError } = require('../errors/category.errors');

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });
    return category;
  } catch (error) {
    throw new DatabaseError('Erro ao criar categoria: ' + error.message);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar categorias: ' + error.message);
  }
};

const getCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new CategoryNotFoundError();
    }
    return category;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar categoria: ' + error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new CategoryNotFoundError();
    }
    await category.destroy();
    return category;
  } catch (error) {
    throw new DatabaseError('Erro ao deletar categoria: ' + error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
