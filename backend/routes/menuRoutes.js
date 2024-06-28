const express = require('express');
const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const menuController = require('../controllers/menuController');
const { DIETARY_INFO, AVAILABILITY } = require('../utils/constants');

const router = express.Router();

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
    .isFloat({ gt: 0.0 })
    .withMessage('Price must be a number greater than 0')
    .notEmpty()
    .withMessage('Price is required'),

  body('restaurantId')
    .isMongoId()
    .withMessage('Please enter a valid restaurant ID')
    .notEmpty()
    .withMessage('Restaurant ID is required'),

  body('preparationTime')
    .isInt()
    .withMessage('Preparation time must be a number')
    .notEmpty()
    .withMessage('Preparation time is required'),

  body('ingredients')
    .isArray()
    .withMessage('Ingredients should be an array')
    .notEmpty()
    .withMessage('Ingredients is required'),

  body('dietaryInfo')
    .isArray()
    .withMessage('Dietary Info should be an array')
    .notEmpty()
    .withMessage('Dietary Info is required')
    .custom((values) => {
      values.forEach((value) => {
        if (!DIETARY_INFO.includes(value)) {
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
      values.forEach((value) => {
        if (!AVAILABILITY.includes(value)) {
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
    .isFloat({ min: 0.0, max: 5.0 })
    .withMessage('Rating must be between 0 and 5'),

  body('visibility')
    .isBoolean()
    .withMessage('Visibility should be a boolean value')
    .notEmpty()
    .withMessage('Visibility is required'),

  body('visitCount')
    .optional()
    .isInt({ eq: 1 })
    .withMessage('VisitCount must be a number equal to 1')
    .notEmpty()
    .withMessage('VisitCount is required'),

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

  body('restaurantId')
    .optional()
    .isMongoId()
    .withMessage('Please enter a valid restaurant ID'),

  body('dietaryInfo')
    .optional()
    .isArray()
    .withMessage('Dietary Info should be an array')
    .custom((values) => {
      values.forEach((value) => {
        if (!DIETARY_INFO.includes(value)) {
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
      values.forEach((value) => {
        if (!AVAILABILITY.includes(value)) {
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
    .optional()
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

// --- For ADMIN ---
// GET /api/v1/admin/menus
router.get('/admin/menus', menuController.getAdminAllMenus);

// GET /api/v1/admin/menu/:menuId
router.get('/admin/menu/:menuId', menuController.getAdminSingleMenu);

// POST /api/v1/admin/menu
router.post('/admin/menu', validateCreateMenu, menuController.createAdminMenu);

// PUT /api/v1/admin/menu/:menuId
router.put(
  '/admin/menu/:menuId',
  validateUpdateSingleMenu,
  menuController.updateAdminSingleMenu
);

// DELETE /api/v1/admin/menu/:menuId
router.delete(
  '/admin/menu/:menuId',
  validateMenuId,
  menuController.deleteAdminSingleMenu
);

module.exports = router;
