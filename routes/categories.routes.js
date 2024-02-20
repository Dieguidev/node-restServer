const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { existCategoryById } = require('../helpers/db-validators');

const {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

const router = Router();

router.get(
  '/',
  [
    check('limit', 'El limit debe ser un número entero').optional().isInt(),
    check('from', 'El from debe ser un número entero').optional().isInt(),
    validateFields,
  ],
  getAllCategories
);

router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  getCategoryById
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategoryById),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  updateCategory
);
router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existCategoryById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
