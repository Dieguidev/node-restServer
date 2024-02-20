const { Role, Categorie, User, Product } = require('../models');

const isRoleValid = async (role = '') => {
  const existRol = await Role.findOne({ role });
  if (!existRol) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

const existsEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El email ${email} ya existe`);
  }
};
const existUserById = async (id = '') => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`El usuario con id ${id} no existe`);
  }
};

const existCategoryById = async (id = '') => {
  const existCategory = await Categorie.findById(id);
  if (!existCategory) {
    throw new Error(`La categoria con id ${id} no existe`);
  }
};

const existCategoryByName = async (name = '') => {
  const existCategory = await Categorie.findOne({ name: name.toUpperCase() });
  if (!existCategory) {
    throw new Error(`La categoria con ${name} no existe`);
  }
};

const existProductById = async (id = '') => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`El producto con id ${id} no existe`);
  }
};

module.exports = {
  isRoleValid,
  existsEmail,
  existUserById,
  existCategoryById,
  existCategoryByName,
  existProductById,
};
