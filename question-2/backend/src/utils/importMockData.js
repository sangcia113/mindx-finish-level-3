// Import data to mongoDB. (1 Point)

const Order = require('../models/orderModel');
const Inventory = require('../models/inventoryModel');
const User = require('../models/userModel');
const encodePassword = require('./encodePassword');

const ordersData = [
    { _id: 1, item: 'almonds', price: 12, quantity: 2 },
    { _id: 2, item: 'pecans', price: 20, quantity: 1 },
    { _id: 3, item: 'pecans', price: 20, quantity: 3 },
];

const inventoryData = [
    { _id: 1, sku: 'almonds', description: 'product 1', instock: 120 },
    { _id: 2, sku: 'bread', description: 'product 2', instock: 80 },
    { _id: 3, sku: 'cashews', description: 'product 3', instock: 60 },
    { _id: 4, sku: 'pecans', description: 'product 4', instock: 70 },
];

const usersData = [
    { _id: 1, username: 'admin', password: encodePassword('MindX@2022') },
    { _id: 2, username: 'alice', password: encodePassword('MindX@2022') },
];

const importData = async () => {
    try {
        await Order.deleteMany({});
        await Inventory.deleteMany({});
        await User.deleteMany({});

        await Order.insertMany(ordersData);
        await Inventory.insertMany(inventoryData);
        await User.insertMany(usersData);

        console.log('Data imported successfully.');
    } catch (error) {
        console.error('Error importing data:', error);
    }
};

module.exports = importData;
