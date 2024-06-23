const Menu = require('../models/menu');

// POST -> Create a new menu -> /api/v1/menu/new
exports.createMenu = async (req, res, next) => {
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

exports.getAllMenus = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Menus fetched successfully!',
  });
};
