const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    dishTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'DishType', required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Dish = mongoose.model('Dish', dishSchema, 'dishs');

module.exports = Dish;
