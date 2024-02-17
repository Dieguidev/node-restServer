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

const putUser = (req, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put API-controlador',
    id,
  });
};

const postUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //todo:verificar si el correo existe
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    return res.status(400).json({
      msg: 'El correo ya existe',
    });
  }

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
