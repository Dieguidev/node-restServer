const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { isRoleValid, existsEmail } = require('../helpers/db-validators');

const {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUser);

router.put(
  '/:id',
  [check('id', 'No es un id valido').isMongoId(), validateFields],
  putUser
);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de 6 caracteres').isLength({
      min: 6,
    }),
    check('email', 'El email no es valido').isEmail(),
    // check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),
    check('email').custom(existsEmail),
    validateFields,
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
