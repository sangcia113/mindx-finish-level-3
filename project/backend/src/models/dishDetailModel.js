const mongoose = require('mongoose');

const dishDetailSchema = new mongoose.Schema({
    dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    standard: { type: Number, required: true },
    createdDate: { type: String, required: true },
    updatedDate: { type: String, default: null },
});

const DishDetail = mongoose.model('DishDetail', dishDetailSchema, 'dish_details');

module.exports = DishDetail;
