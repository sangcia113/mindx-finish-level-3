const UserDish = require('../models/userDishModel');

const userDishService = {
    createUserDish: async userData => {
        const userDish = new UserDish(userData);

        return await userDish.save();
    },

    readAllUserDish: async () => {
        return await UserDish.find();
    },

    readUserDishByUserId: async userId => {
        return await UserDish.findById(userId);
    },

    updateUserDish: async (id, userDishData) => {
        return await UserDish.findByIdAndUpdate(id, userDishData, { new: true });
    },

    deleteUserDish: async id => {
        return await UserDish.findByIdAndDelete(id);
    },
};

module.exports = userDishService;
