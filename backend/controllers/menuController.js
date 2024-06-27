const Menu = require('../models/menuModel');
const { detectValidationError } = require('../utils/error');

const DEFAULT_PAGE = 1;
const MENU_PER_PAGE = 10;

exports.getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find({ visibility: true });

    res.status(200).json({
      success: true,
      message: 'Fetched all menus successfully!',
      count: menus.length,
      data: { menus },
      pagination: {
        page: 2,
        limit: 10,
        totalPages: 5,
        totalItems: 50,
        links: {
          self: '/api/v1/menus?page=1', // TODO: Dynamic page number
          next: '/api/v1/menus?page=2', // TODO: Dynamic page number
          prev: null, // TODO: Dynamic page number
        },
      },
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
  // Ensure the user is authenticated
  // if (!req.user) {
  //   return res.status(401).json({
  //     success: false,
  //     message: 'Authentication required. Please log in.',
  //   });
  // }

  // Ensure the user is authorized
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({
  //     success: false,
  //     message: 'Access denied. Admins only.',
  //   });
  // }

  const {
    search,
    dietaryInfo,
    sort,
    page,
    limit,
    projection,
    minPrice,
    maxPrice,
    rating,
    days,
    startTime,
    endTime,
    minRating,
  } = req.query;

  // Check for valid price range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid price range: minPrice cannot be greater than maxPrice.',
    });
  }

  const queryObject = {};

  // Search filter for menu name or description
  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: 'i' } },
      // { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Filtering by menu type
  if (dietaryInfo && dietaryInfo !== 'all') {
    queryObject.dietaryInfo = dietaryInfo;
  }

  // Filtering by price range
  if (minPrice || maxPrice) {
    queryObject.price = {};
    if (minPrice) {
      queryObject.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      queryObject.price.$lte = Number(maxPrice);
    }
  }

  // Filtering by availability days
  if (days) {
    queryObject['availability.days'] = { $in: days.split(',') };
  }

  // Filtering by availability time range
  if (startTime && endTime) {
    queryObject['availability.startTime'] = { $lte: startTime };
    queryObject['availability.endTime'] = { $gte: endTime };
  }

  // Filtering by minimum rating
  if (minRating) {
    queryObject.rating = { $gte: Number(minRating) };
  }

  // Sort options
  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'name',
    'z-a': '-name',
    'price-asc': 'price',
    'price-desc': '-price',
    'rating-asc': 'rating',
    'rating-desc': '-rating',
  };

  // Determine sorting key
  // const sortKey = sortOptions[sort] || sortOptions.newest;

  // Determine multiple sorting keys
  let sortKey = sort
    ? sort
        .split(',')
        .map((s) => sortOptions[s])
        .join(' ')
    : sortOptions.newest;

  // Pagination setup
  const pageNum = Number(page) || DEFAULT_PAGE;
  const pageLimit = Number(limit) || MENU_PER_PAGE;
  const skip = (pageNum - 1) * pageLimit;

  // Define projection (fields to include/exclude)
  const projectFields = projection ? projection.split(',').join(' ') : '';

  try {
    // Fetching data
    const menus = await Menu.find(queryObject)
      .sort(sortKey)
      .skip(skip)
      .limit(pageLimit)
      .select(projectFields);

    const totalMenuItems = await Menu.countDocuments(queryObject);
    const totalPages = Math.ceil(totalMenus / pageLimit);

    res.status(200).json({
      success: true,
      message: 'Fetched menus successfully!',
      count: totalMenus,
      numOfPages,
      currentPage: pageNum,
      data: { menus },
      pagination: {
        page: pageNum,
        limit: pageLimit,
        totalPages,
        totalMenuItems,
        links: {
          self: `/api/v1/menus?page=${pageNum}`,
          next:
            pageNum !== totalPages ? `/api/v1/menus?page=${pageNum + 1}` : null,
          prev: pageNum === 1 ? null : `/api/v1/menus?page=${pageNum - 1}`,
        },
      },
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
