const DishType = require('../models/dishTypeModel');

const dishTypeService = {
    createDishType: async dishTypeData => {
        const dishType = new DishType(dishTypeData);

        return await dishType.save();
    },

    readAllDishType: async () => {
        return await DishType.find();
    },

    readDishTypeById: async id => {
        return await DishType.findById(id);
    },

    updateDishType: async (id, dishTypeData) => {
        return await DishType.findByIdAndUpdate(id, dishTypeData, { new: true });
    },

    deleteDishType: async id => {
        return await DishType.findByIdAndDelete(id);
    },
};

module.exports = dishTypeService;
