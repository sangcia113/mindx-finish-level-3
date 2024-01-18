const Role = require('../models/roleModel');

const roleService = {
    createRole: async roleData => await new Role(roleData).save(),

    readAllRole: async () => await Role.find(),

    readRoleById: async id => await Role.findById(id),

    updateRole: async (id, roleData) => {
        roleData.updatedDate = new Date();

        return await Role.findByIdAndUpdate(id, roleData, { new: true });
    },

    deleteRole: async id => await Role.findByIdAndDelete(id),
};

module.exports = roleService;
