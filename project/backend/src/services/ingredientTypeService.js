const IngredientType = require('../models/ingredientTypeModel');

const ingredientTypeService = {
    createIngredientType: async ingredientTypeData => {
        const ingredientType = new IngredientType(ingredientTypeData);

        return await ingredientType.save();
    },

    readAllIngredientType: async () => {
        return await IngredientType.find();
    },

    readIngredientTypeById: async id => {
        return await IngredientType.findById(id);
    },

    updateIngredientType: async (id, ingredientTypeData) => {
        return await IngredientType.findByIdAndUpdate(id, ingredientTypeData, { new: true });
    },

    deleteIngredientType: async id => {
        return await IngredientType.findByIdAndDelete(id);
    },
};

module.exports = ingredientTypeService;
