const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const {
  existCategoryByName,
  existProductById,
} = require('../helpers/db-validators');

const router = Router();

router.get(
  '/',
  [
    check('limit', 'El limit debe ser un número entero').optional().isInt(),
    check('from', 'El from debe ser un número entero').optional().isInt(),
    validateFields,
  ],
  getAllProducts
);

router.get(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  getProductById
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description').optional().isString(),
    check('category').custom(existCategoryByName),
    validateFields,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('category').optional().custom(existCategoryByName),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existProductById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
