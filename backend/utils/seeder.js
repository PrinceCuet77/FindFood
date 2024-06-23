const dotenv = require('dotenv');

const Menu = require('../models/menu');
const connectDatabase = require('./database');

const menus = require('../data/menus');

// Setting dotenv file
dotenv.config({ path: 'env.local' });

connectDatabase();

const seedMenus = async () => {
  try {
    await Menu.deleteMany();
    console.log('Menus are deleted');

    await Menu.insertMany(menus);
    console.log('All menus are added.');

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seedMenus();
