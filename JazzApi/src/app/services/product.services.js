const Product = require('../models/Product');
const Category = require('../models/Category');
const { ProductNotFoundError } = require('../errors/product.errors');
const { CategoryNotFoundError } = require('../errors/category.errors');

const createProduct = async (productData) => {
  await verifyCategoryExists(productData.categoryId);
  return Product.create(productData);
};

const updateProduct = async (productId, productData) => {
  await verifyCategoryExists(productData.categoryId);
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new ProductNotFoundError();
  }
  return product.update(productData);
};

const deleteProduct = async (productId) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new ProductNotFoundError();
  }
  return product.destroy();
};

const getAllProducts = async () => {
  return Product.findAll();
};

const verifyCategoryExists = async (categoryId) => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new CategoryNotFoundError('Categoria não encontrada');
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
