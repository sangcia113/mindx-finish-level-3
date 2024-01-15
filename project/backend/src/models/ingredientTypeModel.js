const mongoose = require('mongoose');

const ingredientTypeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const IngredientType = mongoose.model('IngredientType', ingredientTypeSchema, 'ingredient_types');

module.exports = IngredientType;
