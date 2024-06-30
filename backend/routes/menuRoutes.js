const express = require('express');

const menuController = require('../controllers/menuController');
const {
  validateCreateMenu,
  validateUpdateSingleMenu,
  validateIdParam,
} = require('../middleware/validationMiddleware');

const router = express.Router();

// GET /api/v1/menus
router.get('/menus', menuController.getAllMenus);

// GET /api/v1/menu/:menuId
router.get('/menu/:menuId', validateIdParam, menuController.getSingleMenu);

// --- For ADMIN ---
// GET /api/v1/admin/menus
router.get('/admin/menus', menuController.getAdminAllMenus);

// GET /api/v1/admin/menu/:menuId
router.get('/admin/menu/:menuId', validateIdParam, menuController.getAdminSingleMenu);

// POST /api/v1/admin/menu
router.post('/admin/menu', validateCreateMenu, menuController.createAdminMenu);

// PUT /api/v1/admin/menu/:menuId
router.put(
  '/admin/menu/:menuId',
  validateIdParam,
  validateUpdateSingleMenu,
  menuController.updateAdminSingleMenu
);

// DELETE /api/v1/admin/menu/:menuId
router.delete(
  '/admin/menu/:menuId',
  validateIdParam,
  menuController.deleteAdminSingleMenu
);

module.exports = router;
