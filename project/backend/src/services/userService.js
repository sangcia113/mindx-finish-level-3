const User = require('../models/userModel');

const userService = {
    createUser: async userData => {
        const user = new User(userData);

        return await user.save();
    },

    readAllUser: async () => {
        return await User.find();
    },

    readUserById: async id => {
        return await User.findById(id);
    },

    readUserByUsername: async username => {
        return await User.findOne({ username });
    },

    updateUser: async (id, userData) => {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    },

    deleteUser: async id => {
        return await User.findByIdAndDelete(id);
    },
};

module.exports = userService;
