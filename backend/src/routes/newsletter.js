const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const { newsletterValidation, idParamValidation } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

router.post('/', newsletterValidation, newsletterController.subscribe);
router.get('/', authenticateToken, newsletterController.getAll);
router.delete('/:id', authenticateToken, idParamValidation, newsletterController.remove);

module.exports = router;
