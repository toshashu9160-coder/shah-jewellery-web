const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { testimonialValidation, idParamValidation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

router.get('/', testimonialController.getAll);
router.get('/:id', idParamValidation, testimonialController.getById);
router.post('/', testimonialValidation, testimonialController.create);
router.put('/:id/approve', authenticateToken, idParamValidation, testimonialController.approve);
router.delete('/:id', authenticateToken, idParamValidation, testimonialController.remove);

module.exports = router;
