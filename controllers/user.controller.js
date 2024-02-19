const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { isActive: true };

  // const users = await User.find({ isActive: true }).skip(from).limit(limit);
  // const total = await User.countDocuments({ isActive: true });
  // .skip(from)
  // .limit(limit);
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit),
  ]);

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

const deleteUser = async (req, res = response) => {
  const { id } = req.params;

  //fisicamewnte borramos de la db
  // const user = await User.findByIdAndDelete(id);

  //cambiando el estado del usuario
  const authenticatedUser = req.user;
  const user = await User.findByIdAndUpdate(id, { isActive: false });

  res.json(user);
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
