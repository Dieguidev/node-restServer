const { request, response } = require('express');

const { Categorie } = require('../models');

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

module.exports = {
  createCategory,
};
