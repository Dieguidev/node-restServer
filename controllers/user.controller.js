const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUser = (req = request, res = response) => {
  const { name } = req.query;
  res.json({
    msg: 'get API-controlador',
    name,
  });
};

const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //todo: validar contra db
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    user,
  });
};

const postUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //todo: encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //guardar en db
  await user.save();

  res.json({
    user,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    msg: 'delete API - controlador',
  });
};

const patchUser = (req, res) => {
  res.json({
    msg: 'patch API-controller',
  });
};

module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
};
