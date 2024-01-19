const IngredientType = require('../models/ingredientTypeModel');

const ingredientTypeService = {
    createIngredientType: async ingredientTypeData =>
        await new IngredientType(ingredientTypeData).save(),

    readAllIngredientType: async () => await IngredientType.find(),

    readIngredientTypeById: async id => await IngredientType.findById(id),

    updateIngredientType: async (id, ingredientTypeData) => {
        ingredientTypeData.updatedDate = new Date();

        return await IngredientType.findByIdAndUpdate(id, ingredientTypeData, { new: true });
    },

    deleteIngredientType: async id => await IngredientType.findByIdAndDelete(id),
};

module.exports = ingredientTypeService;
