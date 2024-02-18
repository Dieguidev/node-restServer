const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;

  const users = await User.find().skip(from).limit(limit);
  const total = await User.countDocuments().skip(from).limit(limit);
  res.json({
    total,
    users,
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

  res.json(user);
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
  getAllUsers,
  putUser,
  postUser,
  deleteUser,
  patchUser,
};
