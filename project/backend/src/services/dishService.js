const Dish = require('../models/dishModel');

const dishService = {
    createDish: async dishData => await new Dish(dishData).save(),

    readAllDish: async () => await Dish.find(),

    readDishById: async id => await Dish.findById(id),

    updateDish: async (id, dishData) => {
        dishData.updatedDate = new Date();

        return await Dish.findByIdAndUpdate(id, dishData, { new: true });
    },

    deleteDish: async id => await Dish.findByIdAndDelete(id),
};

module.exports = dishService;
