const { response } = require('express');
const User = require('../models/user.model');

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
  const body = req.body;

  const user = new User(body);
  await user.save();

  res.json({
    msg: 'post API-controlador',
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
