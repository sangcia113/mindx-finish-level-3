const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    unit: { type: Number, required: true },
    minStock: { type: Number, required: true },
    ingredientTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IngredientType',
        required: true,
    },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema, 'ingredients');

module.exports = Ingredient;
