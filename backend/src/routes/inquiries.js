const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { inquiryValidation, idParamValidation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, inquiryController.getAll);
router.get('/:id', authenticateToken, idParamValidation, inquiryController.getById);
router.post('/', inquiryValidation, inquiryController.create);
router.put('/:id/read', authenticateToken, idParamValidation, inquiryController.markAsRead);
router.delete('/:id', authenticateToken, idParamValidation, inquiryController.remove);

module.exports = router;
