const {
    createDepartment,
    readAllDepartment,
    readDepartmentById,
    updateDepartment,
    deleteDepartment,
} = require('../services/departmentService');

const departmentController = {
    createDepartment: async (req, res) => {
        try {
            const departmentData = req.body;

            const response = await createDepartment(departmentData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllDepartment: async (req, res) => {
        try {
            const response = await readAllDepartment();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readDepartmentById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readDepartmentById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateDepartment: async (req, res) => {
        try {
            const { id } = req.params;

            const departmentData = req.body;

            const response = await updateDepartment(id, departmentData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteDepartment: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteDepartment(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = departmentController;
