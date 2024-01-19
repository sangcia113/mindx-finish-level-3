const Menu = require('../models/menuModel');

const menuService = {
    createMenu: async menuData => await new Menu(menuData).save(),

    readAllMenu: async () => await Menu.find(),

    readMenuById: async id => await Menu.findById(id),

    updateMenu: async (id, menuData) => {
        menuData.updatedDate = new Date();

        return await Menu.findByIdAndUpdate(id, menuData, { new: true });
    },

    deleteMenu: async id => await Menu.findByIdAndDelete(id),
};

module.exports = menuService;
