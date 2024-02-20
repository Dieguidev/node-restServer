const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { createCategory } = require('../controllers/categories.controller');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hello World',
  });
});

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

module.exports = router;
