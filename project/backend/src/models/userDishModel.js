const mongoose = require('mongoose');

const userDishSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const UserDish = mongoose.model('UserDish', userDishSchema, 'user_dishs');

module.exports = UserDish;
