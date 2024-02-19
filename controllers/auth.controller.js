const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify(id_token);
    //verificar si el email existe en la db
    let user = await User.findOne({ email });
    if (!user) {
      //si usuario no existe crearlo
      const data = {
        name,
        email,
        password: ':P123456',
        img,
        google: true,
      };

      user = new User(data);

      await user.save();
    }

    //si el usuario en db esta en false
    if (!user.isActive) {
      return res.status(401).json({
        msg: 'Hable con el administrador, usuario bloqueado',
      });
    }

    //Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: 'El token de google no se pudo verificar',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
