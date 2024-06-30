const { body, param, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors/customErrors.js');
const { DIETARY_INFO, AVAILABILITY } = require('../utils/constants');
const Menu = require('../models/menuModel.js')

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith('No menu')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('Not authorized')) {
          throw new UnauthorizedError('Not authorized to access this route');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

exports.validateIdParam = withValidationErrors([
  param('menuId').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('Invalid MongoDB id');
    const menu = await Menu.findById(value);
    if (!menu) throw new NotFoundError(`No menu with id ${value}`);
    // const isAdmin = req.user.role === 'admin';
    // const isOwner = req.user.userId === job.createdBy.toString();

    // if (!isAdmin && !isOwner)
    //   throw new UnauthorizedError('not authorized to access this route');
  }),
]);

exports.validateCreateMenu = withValidationErrors([
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
]);

exports.validateUpdateSingleMenu = withValidationErrors([
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

  body('preparationTime')
    .isInt()
    .withMessage('Preparation time must be a number')
    .notEmpty()
    .withMessage('Preparation time is required'),

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
]);
