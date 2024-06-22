const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/authController');
// const User = require('../models/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// PUT /auth/signup
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;
