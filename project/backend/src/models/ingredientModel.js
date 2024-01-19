const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
    minStock: { type: Number, required: true },
    ingredientTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IngredientType',
        required: true,
    },
    createdDate: { type: Date, required: true, default: Date.now },
    updatedDate: { type: Date, default: null },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema, 'ingredients');

module.exports = Ingredient;
