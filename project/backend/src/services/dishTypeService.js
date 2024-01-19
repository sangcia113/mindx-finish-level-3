const DishType = require('../models/dishTypeModel');

const dishTypeService = {
    createDishType: async dishTypeData => await new DishType(dishTypeData).save(),

    readAllDishType: async () => await DishType.find(),

    readDishTypeById: async id => await DishType.findById(id),

    updateDishType: async (id, dishTypeData) => {
        dishTypeData.updatedDate = new Date();

        return await DishType.findByIdAndUpdate(id, dishTypeData, { new: true });
    },

    deleteDishType: async id => await DishType.findByIdAndDelete(id),
};

module.exports = dishTypeService;
