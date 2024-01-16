const {
    createUnit,
    readAllUnit,
    readUnitById,
    updateUnit,
    deleteUnit,
} = require('../services/unitService');

const unitController = {
    createUnit: async (req, res) => {
        try {
            const unitData = req.body;

            const response = await createUnit(unitData);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readAllUnit: async (req, res) => {
        try {
            const response = await readAllUnit();

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    readUnitById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUnitById(id);

            console.log(response);

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateUnit: async (req, res) => {
        try {
            const { id } = req.params;

            const unitData = req.body;

            const response = await updateUnit(id, unitData);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    deleteUnit: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await deleteUnit(id);

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = unitController;
