const { request, response } = require('express');

const { Categorie } = require('../models');

const getAllCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query).skip(from).limit(limit),
  ]);

  res.json({
    total,
    categories,
  });
};

const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Categorie.findById(id);

  res.json(category);
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Categorie.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${categoryDB.name}, ya existe`,
    });
  }

  //generar la data a guardar
  const data = {
    name,
    user: req.user._id,
  };
  const category = new Categorie(data);
  //guardar DB
  await category.save();

  res.json(category);
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { isActive, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Categorie.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Categorie.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  res.json(category);
};

module.exports = {
  createCategory,
};
