const {
    createMenu,
    readAllMenu,
    readMenuById,
    updateMenu,
    deleteMenu,
} = require('../services/menuService');

const menuController = {
    createMenu: async (req, res) => {
        try {
            const menuData = req.body;

            await createMenu(menuData);

            res.status(200).json({ error: 0, message: 'Thêm mới dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Thêm mới dữ liệu thất bại!' });
        }
    },

    readAllMenu: async (req, res) => {
        try {
            const response = await readAllMenu();

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    readMenuById: async (req, res) => {
        try {
            const { id } = req.params;

            const response = await readMenuById(id);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Đọc dữ liệu thất bại!' });
        }
    },

    updateMenu: async (req, res) => {
        try {
            const { id } = req.params;

            const menuData = req.body;

            await updateMenu(id, menuData);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Cập nhật dữ liệu thất bại!' });
        }
    },

    deleteMenu: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteMenu(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({ error: -1000, message: 'Xóa dữ liệu thất bại!' });
        }
    },
};

module.exports = menuController;
