const categoryService = require('../services/category.services');
const { CategoryNotFoundError, DatabaseError } = require('../errors/category.errors');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      throw new CategoryNotFoundError();
    }
    res.json(category);
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
