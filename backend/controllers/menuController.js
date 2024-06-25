const { validationResult } = require('express-validator');

const Menu = require('../models/menu');

exports.getAllMenus = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Menus fetched successfully!',
  });
};

exports.createMenu = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array(); // Add the errors array to the error data
    return next(error); // Pass the error to the error-handling middleware
  }

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const restaurant = req.body.restaurant;
  const dietaryInfo = req.body.dietaryInfo;
  const availability = req.body.availability;
  const rating = req.body.rating;
  const reviews = req.body.reviews;
  const images = req.body.images;

  const menu = new Menu({
    name,
    description,
    price,
    restaurant,
    dietaryInfo,
    availability,
    rating,
    reviews,
    images,
  });

  try {
    const result = await menu.save();
    console.log(result);

    res.status(201).json({
      message: 'A new menu is created successfully!',
      menu,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err); // Try to reach the next error handling middleware
  }
};

exports.getSingleMenu = async (req, res, next) => {};

exports.updateSingleMenu = async (req, res, next) => {}

exports.deleteSingleMenu = async (req, res, next) => {};

exports.createAdminMenu = async (req, res, next) => {};

exports.getAdminSingleMenu = async (req, res, next) => {};

exports.updateAdminSingleMenu = async (req, res, next) => {};

exports.deleteAdminSingleMenu = async (req, res, next) => {};