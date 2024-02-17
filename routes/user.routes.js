const { Router } = require('express');
const {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require('../controllers/user.controller');
const { check } = require('express-validator');

const router = Router();

router.get('/', getUser);

router.put('/:id', putUser);

router.post(
  '/',
  [
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El email no es valido').isEmail(),
    // validarCampos,
    // validarCorreoExiste,
    // validarRol,
    // validarJWT,
    // validarAdminRole,
  ],
  postUser
);

router.delete('/', deleteUser);

router.patch('/', patchUser);

module.exports = router;
