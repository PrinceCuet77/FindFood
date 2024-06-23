exports.getAllMenus = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Menus fetched successfully!',
  });
};
