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

            await createUnit(unitData);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readAllUnit: async (req, res) => {
        try {
            const response = await readAllUnit();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    readUnitById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readUnitById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    updateUnit: async (req, res) => {
        try {
            const { id } = req.params;

            const unitData = req.body;

            await updateUnit(id, unitData);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },

    deleteUnit: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteUnit(id);

            res.status(200).json({ error: 0, message: 'Thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thất bại!' });
        }
    },
};

module.exports = unitController;
