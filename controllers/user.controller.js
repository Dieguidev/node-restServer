const { response } = require('express');

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

const postUser = (req, res = response) => {
  const { name, edad } = req.body;
  res.json({
    msg: 'post API-controlador',
    name,
    edad,
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
