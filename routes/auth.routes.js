const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields,
  ],
  login
);
router.post(
  '/google',
  [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
