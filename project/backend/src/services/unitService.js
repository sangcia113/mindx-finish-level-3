const Unit = require('../models/unitModel');

const userService = {
    createUnit: async unitData => await new Unit(unitData).save(),

    readAllUnit: async () => await Unit.find(),

    readUnitById: async id => await Unit.findById(id),

    updateUnit: async (id, unitData) => {
        unitData.updatedDate = new Date();

        return await Unit.findByIdAndUpdate(id, unitData, { new: true });
    },

    deleteUnit: async id => await Unit.findByIdAndDelete(id),
};

module.exports = userService;
