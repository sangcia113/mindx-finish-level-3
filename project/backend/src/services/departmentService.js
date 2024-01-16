const Department = require('../models/departmentModel');

const departmentService = {
    createDepartment: async departmentData => {
        const department = new Department(departmentData);

        return await department.save();
    },

    readAllDepartment: async () => {
        return await Department.find();
    },

    readDepartmentById: async id => {
        return await Department.findById(id);
    },

    updateDepartment: async (id, departmentData) => {
        return await Department.findByIdAndUpdate(id, departmentData, { new: true });
    },

    deleteDepartment: async id => {
        return await Department.findByIdAndDelete(id);
    },
};

module.exports = departmentService;
