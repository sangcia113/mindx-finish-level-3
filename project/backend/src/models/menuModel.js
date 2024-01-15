const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    menuDate: { type: String, required: true, unique: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Menu = mongoose.model('Menu', menuSchema, 'menus');

module.exports = Menu;
