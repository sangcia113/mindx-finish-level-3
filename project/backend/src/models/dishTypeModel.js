const mongoose = require('mongoose');

const dishTypeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const DishType = mongoose.model('DishType', dishTypeSchema, 'dish_types');

module.exports = DishType;
