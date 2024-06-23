const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menuController');

// GET /api/v1/menus
router.get('/menus', menuController.getAllMenus);

// POST /api/v1/menu/new
router.post('/menu/new', menuController.createMenu);

module.exports = router;
