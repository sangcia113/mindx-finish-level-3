const Ingredient = require('../models/ingredientModel');

const ingredientService = {
    createIngredient: async ingredientData => await new Ingredient(ingredientData).save(),

    readAllIngredient: async () => await Ingredient.find(),

    readIngredientById: async id => await Ingredient.findById(id),

    updateIngredient: async (id, ingredientData) => {
        ingredientData.updatedDate = new Date();

        return await Ingredient.findByIdAndUpdate(id, ingredientData, { new: true });
    },

    deleteIngredient: async id => await Ingredient.findByIdAndDelete(id),
};

module.exports = ingredientService;
