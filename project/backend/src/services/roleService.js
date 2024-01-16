const Role = require('../models/roleModel');

const roleService = {
    createRole: async roleData => {
        const role = new Role(roleData);

        return await role.save();
    },

    readAllRole: async () => {
        return await Role.find();
    },

    readRoleById: async id => {
        return await Role.findById(id);
    },

    updateRole: async (id, roleData) => {
        return await Role.findByIdAndUpdate(id, roleData, { new: true });
    },

    deleteRole: async id => {
        return await Role.findByIdAndDelete(id);
    },
};

module.exports = roleService;
