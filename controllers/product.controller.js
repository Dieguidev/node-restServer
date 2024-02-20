const { request, response } = require('express');

const { Product } = require('../models');
const { Categorie } = require('../models');

const getAllProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProductById = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
};

const createProduct = async (req = request, res = response) => {
  const { isActive, user, category, name, ...body } = req.body;

  const productDB = await Product.findOne({ name: name.toUpperCase() });

  if (productDB) {
    return res.status(400).json({
      msg: `The product ${productDB.name} already exists`,
    });
  }
  const categoryDB = await Categorie.findOne({ name: category.toUpperCase() });

  const data = {
    ...body,
    name: name.toUpperCase(),
    user: req.user._id,
    category: categoryDB._id,
  };
  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { isActive, user, category, name, ...data } = req.body;

  if (name) {
    data.name = name.toUpperCase();
  }
  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
