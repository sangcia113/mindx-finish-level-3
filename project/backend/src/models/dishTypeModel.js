const mongoose = require('mongoose');

const dishTypeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const DishType = mongoose.model('DishType', dishTypeSchema, 'dish_types');

module.exports = DishType;
