const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    menuDate: { type: Date, required: true, unique: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Menu = mongoose.model('Menu', menuSchema, 'menus');

module.exports = Menu;
