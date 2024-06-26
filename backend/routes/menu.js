const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');

const router = express.Router();
const menuController = require('../controllers/menuController');

const validateCreateMenu = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0')
    .notEmpty()
    .withMessage('Price is required'),

  body('restaurant')
    .isMongoId()
    .withMessage('Please enter a valid restaurant ID')
    .notEmpty()
    .withMessage('Restaurant ID is required'),

  body('dietaryInfo')
    .isArray()
    .withMessage('Dietary Info should be an array')
    .notEmpty()
    .withMessage('Dietary Info is required')
    .custom((values) => {
      const allowedValues = [
        'vegetarian',
        'vegan',
        'gluten-free',
        'keto',
        'halal',
        'kosher',
      ];
      values.forEach((value) => {
        if (!allowedValues.includes(value)) {
          throw new Error('Invalid dietary info provided');
        }
      });
      return true;
    }),

  body('availability.days')
    .isArray()
    .withMessage('Days should be an array')
    .notEmpty()
    .withMessage('Days are required')
    .custom((values) => {
      const allowedValues = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];
      values.forEach((value) => {
        if (!allowedValues.includes(value)) {
          throw new Error('Invalid day provided');
        }
      });
      return true;
    }),

  body('availability.startTime')
    .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .withMessage('Start time must be in HH:MM format')
    .notEmpty()
    .withMessage('Start time is required'),

  body('availability.endTime')
    .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .withMessage('End time must be in HH:MM format')
    .notEmpty()
    .withMessage('End time is required'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  
  body('visibility')
    .isBoolean()
    .withMessage('Visibility should be a boolean value')
    .notEmpty()
    .withMessage('Visibility is required'),

  body('reviews')
    .isArray()
    .withMessage('Reviews should be an array')
    .custom((values) => {
      values.forEach((review) => {
        if (!review.user || !mongoose.Types.ObjectId.isValid(review.user)) {
          throw new Error('Each review must have a valid user ID');
        }
        if (!review.comment || typeof review.comment !== 'string') {
          throw new Error('Each review must have a comment');
        }
        if (!review.rating || typeof review.rating !== 'number') {
          throw new Error('Each review must have a rating');
        }
      });
      return true;
    }),

  body('images')
    .isArray()
    .withMessage('Images should be an array')
    .notEmpty()
    .withMessage('Images are required')
    .custom((values) => {
      values.forEach((image) => {
        if (!image.publicId || typeof image.publicId !== 'string') {
          throw new Error('Each image must have a publicId');
        }
        if (!image.url || typeof image.url !== 'string') {
          throw new Error('Each image must have a URL');
        }
      });
      return true;
    }),
];

const validateMenuId = [
  param('menuId').isMongoId().withMessage('Please provide a valid menu ID'),
];

const validateUpdateSingleMenu = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be less than 50 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters'),

  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),

  body('restaurant')
    .optional()
    .isMongoId()
    .withMessage('Please enter a valid restaurant ID'),

  body('dietaryInfo')
    .optional()
    .isArray()
    .withMessage('Dietary Info should be an array')
    .custom((values) => {
      const allowedValues = [
        'vegetarian',
        'vegan',
        'gluten-free',
        'keto',
        'halal',
        'kosher',
      ];
      values.forEach((value) => {
        if (!allowedValues.includes(value)) {
          throw new Error('Invalid dietary info provided');
        }
      });
      return true;
    }),

  body('availability.days')
    .optional()
    .isArray()
    .withMessage('Days should be an array')
    .custom((values) => {
      const allowedValues = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ];
      values.forEach((value) => {
        if (!allowedValues.includes(value)) {
          throw new Error('Invalid day provided');
        }
      });
      return true;
    }),

  body('availability.startTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .withMessage('Start time must be in HH:MM format'),

  body('availability.endTime')
    .optional()
    .matches(/^([01]\d|2[0-3]):?([0-5]\d)$/)
    .withMessage('End time must be in HH:MM format'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  
  body('visibility')
    .isBoolean()
    .withMessage('Visibility should be a boolean value')
    .notEmpty()
    .withMessage('Visibility is required'),

  body('reviews')
    .optional()
    .isArray()
    .withMessage('Reviews should be an array')
    .custom((values) => {
      values.forEach((review) => {
        if (!review.user || !mongoose.Types.ObjectId.isValid(review.user)) {
          throw new Error('Each review must have a valid user ID');
        }
        if (!review.comment || typeof review.comment !== 'string') {
          throw new Error('Each review must have a comment');
        }
        if (typeof review.rating !== 'number') {
          throw new Error('Each review must have a rating');
        }
      });
      return true;
    }),

  body('images')
    .optional()
    .isArray()
    .withMessage('Images should be an array')
    .custom((values) => {
      values.forEach((image) => {
        if (!image.publicId || typeof image.publicId !== 'string') {
          throw new Error('Each image must have a publicId');
        }
        if (!image.url || typeof image.url !== 'string') {
          throw new Error('Each image must have a URL');
        }
      });
      return true;
    }),
];

// GET /api/v1/menus
router.get('/menus', menuController.getAllMenus);

// GET /api/v1/menu/:menuId
router.get('/menu/:menuId', validateMenuId, menuController.getSingleMenu);

// --- CRUD - Single Menu Item For ADMIN ---
// GET /api/v1/admin/menus
router.get('/admin/menus', menuController.getAdminAllMenus);

// POST /api/v1/admin/menu
router.post('/admin/menu', validateCreateMenu, menuController.createAdminMenu);

// PUT /api/v1/admin/menu/:menuId
router.put('admin/menu/:menuId', validateUpdateSingleMenu, menuController.updateAdminSingleMenu);

// DELETE /api/v1/admin/menu/:menuId
router.delete('admin/menu/:menuId', validateMenuId, menuController.deleteAdminSingleMenu);

module.exports = router;
