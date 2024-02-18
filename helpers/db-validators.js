const Role = require('../models/role.model');
const User = require('../models/user.model');

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

module.exports = {
  isRoleValid,
  existsEmail,
};
