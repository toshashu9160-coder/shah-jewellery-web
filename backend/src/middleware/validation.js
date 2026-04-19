const { body, param, query, validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
}

const loginValidation = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  handleValidationErrors
];

const inquiryValidation = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  handleValidationErrors
];

const testimonialValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('comment').trim().notEmpty().withMessage('Comment is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  handleValidationErrors
];

const newsletterValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  handleValidationErrors
];

const idParamValidation = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  loginValidation,
  productValidation,
  inquiryValidation,
  testimonialValidation,
  newsletterValidation,
  idParamValidation
};
