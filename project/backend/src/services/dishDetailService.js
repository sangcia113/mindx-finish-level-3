const DishDetail = require('../models/dishDetailModel');

const dishDetailService = {
    createDishDetail: async dishDetailData => await DishDetail.insertMany(dishDetailData),

    readAllDishDetail: async () => await DishDetail.find(),

    readDishDetailByDishId: async dishId => await DishDetail.find({ dishId }),

    updateDishDetail: async (id, dishDetailData) => {
        dishDetailData.updatedDate = new Date();

        return await DishDetail.findByIdAndUpdate(id, dishDetailData, { new: true });
    },

    deleteDishDetail: async id => await DishDetail.findByIdAndDelete(id),
};

module.exports = dishDetailService;
