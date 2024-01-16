const Unit = require('../models/unitModel');

const userService = {
    createUnit: async userData => {
        const unit = new Unit(userData);

        return await unit.save();
    },

    readAllUnit: async () => {
        return await Unit.find();
    },

    readUnitById: async id => {
        return await Unit.findById(id);
    },

    updateUnit: async (id, userData) => {
        return await Unit.findByIdAndUpdate(id, userData, { new: true });
    },

    deleteUnit: async id => {
        return await Unit.findByIdAndDelete(id);
    },
};

module.exports = userService;
