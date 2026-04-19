const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidation, idParamValidation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

router.get('/', productController.getAll);
router.get('/:id', idParamValidation, productController.getById);
router.post('/', authenticateToken, productValidation, productController.create);
router.put('/:id', authenticateToken, idParamValidation, productController.update);
router.delete('/:id', authenticateToken, idParamValidation, productController.remove);

module.exports = router;
