const Role = require('../models/role.model');

const isRoleValid = async (role = '') => {
  const existRol = await Role.findOne({ role });
  if (!existRol) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

module.exports = {
  isRoleValid,
};
