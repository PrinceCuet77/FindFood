const Menu = require('../models/menuModel');
const { detectValidationError } = require('../utils/error');

exports.getAllMenus = async (req, res, next) => {
  // TODO: Pagination
  try {
    const menus = await Menu.find({ visibility: true });

    res.status(200).json({
      success: true,
      message: 'Fetched all menus successfully!',
      count: menus.length,
      data: { menus },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};

exports.getSingleMenu = async (req, res, next) => {
  detectValidationError(req, next);

  const menuId = req.params.menuId;

  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      const error = new Error('Could not find menu.');
      error.statusCode = 404;
      error.data = { menuId };
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Fetched a menu successfully!',
      data: { menu },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
      err.data = { menuId };
    }
    next(err);
  }
};

exports.getAdminAllMenus = async (req, res, next) => {
  // TODO: Pagination
  try {
    const menus = await Menu.find();

    res.status(200).json({
      success: true,
      message: 'Fetched menus successfully!',
      count: menus.length,
      data: { menus },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};

exports.getAdminSingleMenu = async (req, res, next) => {
  detectValidationError(req, next);

  const menuId = req.params.menuId;
  try {
    const menu = await Menu.findById(menuId);

    res.status(200).json({
      success: true,
      message: 'Fetched a menu successfully!',
      data: { menu },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
      err.data = { menuId };
    }
    next(err);
  }
};

exports.createAdminMenu = async (req, res, next) => {
  detectValidationError(req, next);

  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    restaurant: req.body.restaurant,
    dietaryInfo: req.body.dietaryInfo,
    availability: req.body.availability,
    rating: req.body.rating,
    visibility: req.body.visibility,
    reviews: req.body.reviews,
    images: req.body.images,
  });

  try {
    const result = await menu.save();

    res.status(201).json({
      success: true,
      message: 'Created a new food menu item successfully!',
      data: { menu: result },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};

exports.updateAdminSingleMenu = async (req, res, next) => {
  detectValidationError(req, next);

  const menuId = req.params.menuId;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      const error = new Error('Could not find food menu.');
      error.statusCode = 404;
      error.data = { menuId };
      throw error;
    }

    menu.name = req.body.name;
    menu.description = req.body.description;
    menu.price = req.body.price;
    menu.restaurant = req.body.restaurant;
    menu.dietaryInfo = req.body.dietaryInfo;
    menu.availability = req.body.availability;
    menu.rating = req.body.rating;
    menu.reviews = req.body.reviews;
    menu.images = req.body.images;

    const result = await menu.save();

    res.status(200).json({
      success: true,
      message: 'Menu is updated!',
      data: { menu: result },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};

exports.deleteAdminSingleMenu = async (req, res, next) => {
  detectValidationError(req, next);

  const menuId = req.params.menuId;
  try {
    const menu = await Menu.findById(menuId);
    if (!menu) {
      const error = new Error('Could not find food menu.');
      error.statusCode = 404;
      error.data = { menuId };
      throw error;
    }

    const result = await Menu.findByIdAndDelete(menuId);
    res.status(200).json({
      success: true,
      message: 'A menu is deleted successfully!',
      data: { menu: result },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = 'Internal Server Error';
    }
    next(err);
  }
};
