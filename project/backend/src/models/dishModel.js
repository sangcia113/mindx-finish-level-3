const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dishTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'DishType', required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Dish = mongoose.model('Dish', dishSchema, 'dishs');

module.exports = Dish;
