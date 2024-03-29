const User = require('../models/userModel');

const userService = {
    createUser: async userData => await new User(userData).save(),

    readAllUser: async (page, pageSize) => {
        const total = await User.countDocuments();
        const data = await User.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        return { data, page, pageSize, total };
    },

    readUserById: async id => await User.findById(id),

    readUserByNumberphone: async numberPhone => await User.findOne({ numberPhone }),

    updateUser: async (id, userData) => {
        userData.updatedDate = new Date();

        return await User.findByIdAndUpdate(id, userData, { new: true });
    },

    deleteUser: async id => await User.findByIdAndDelete(id),

    checkUserIsExisted: async (code, numberPhone) => await User.findOne({ code, numberPhone }),
};

module.exports = userService;
