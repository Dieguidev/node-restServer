const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Categorie, Product, Role } = require('../models');

const permittedCollections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (term = '', res = response) => {
  //validar que se un mongo id
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i'); //i para que sea insensible a mayusculas y minusculas

  const query = {
    $or: [{ name: regex }, { email: regex }],
    $and: [{ isActive: true }],
  };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query),
  ]);

  res.json({
    results: { total, users },
  });
};

const searchCategories = async (term = '', res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const category = await Categorie.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, 'i'); //i para que sea insensible a mayusculas y minusculas

  const query = { name: regex, isActive: true };

  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query),
  ]);

  res.json({
    results: { total, categories },
  });
};

const searchProducts = async (term = '', res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, 'i'); //i para que sea insensible a mayusculas y minusculas

  const query = { name: regex, isActive: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).populate('category', 'name'),
  ]);

  res.json({
    results: { total, products },
  });
};

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!permittedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The collection ${collection} is not permitted`,
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;
    case 'categories':
      searchCategories(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    default:
      return res.status(500).json({
        msg: 'No agregada esa coleccion',
      });
  }
};

module.exports = {
  search,
};
