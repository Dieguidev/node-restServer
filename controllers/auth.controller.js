const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generateJWT');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    //verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - email',
      });
    }

    //verificar si el usuario esta activo
    if (!user.isActive) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - status: false',
      });
    }

    //verificar la contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password',
      });
    }

    //generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  login,
};
