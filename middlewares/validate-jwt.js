const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la peticion',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    //leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    //vaalidando que el usuario exista
    if (!user) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no existe en DB',
      });
    }

    //verificar si isActive esta en true
    if (!user.isActive) {
      return res.status(401).json({
        msg: 'Token no valido - usuario no activo',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: 'Token no valido',
    });
  }
};

module.exports = { validateJWT };
