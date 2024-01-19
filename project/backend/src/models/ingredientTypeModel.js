const mongoose = require('mongoose');

const ingredientTypeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const IngredientType = mongoose.model('IngredientType', ingredientTypeSchema, 'ingredient_types');

module.exports = IngredientType;
