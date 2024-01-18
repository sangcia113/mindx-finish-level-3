const Department = require('../models/departmentModel');

const departmentService = {
    createDepartment: async departmentData => await new Department(departmentData).save(),

    readAllDepartment: async () => await Department.find(),

    readDepartmentById: async id => await Department.findById(id),

    updateDepartment: async (id, departmentData) => {
        departmentData.updatedDate = new Date();

        return await Department.findByIdAndUpdate(id, departmentData, { new: true });
    },

    deleteDepartment: async id => await Department.findByIdAndDelete(id),
};

module.exports = departmentService;
