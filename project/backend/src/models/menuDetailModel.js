const mongoose = require('mongoose');

const menuDetailSchema = new mongoose.Schema({
    servingSize: { type: Number, required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const MenuDetail = mongoose.model('MenuDetail', menuDetailSchema, 'menu_details');

module.exports = MenuDetail;
