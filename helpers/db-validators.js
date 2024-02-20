const { Role, Categorie, User } = require('../models');

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

module.exports = {
  isRoleValid,
  existsEmail,
  existUserById,
  existCategoryById,
};
