const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');

const JWT_KEY = 'secret';

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Salt value = 10
    const user = new User({
      email,
      password: hashedPassword,
    });

    const result = await user.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Created a new user successfully!',
      data: { user: result },
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      JWT_KEY,
      { expiresIn: '1h' } // Invalid after 1 hour
    );

    res.status(StatusCodes.OK).json({
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};
