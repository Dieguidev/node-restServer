const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Hello World',
  });
});

module.exports = router;
