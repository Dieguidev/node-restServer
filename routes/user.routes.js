const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const {
  isRoleValid,
  existsEmail,
  existUserById,
} = require('../helpers/db-validators');

const {
  putUser,
  postUser,
  deleteUser,
  patchUser,
  getAllUsers,
} = require('../controllers/user.controller');

const router = Router();

router.get(
  '/',
  [
    check('limit', 'El limit debe ser un número entero').optional().isInt(),
    check('from', 'El from debe ser un número entero').optional().isInt(),
    validateFields,
  ],
  getAllUsers
);

router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isRoleValid),
    validateFields,
  ],
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

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields,
  ],
  deleteUser
);

router.patch('/', patchUser);

module.exports = router;
