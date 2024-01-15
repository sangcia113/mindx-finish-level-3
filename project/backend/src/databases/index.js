require('dotenv').config();

const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(URL);

        console.log('Coonected successfully to server');
    } catch (error) {
        console.log('Connected error: ', error);
    }
};

module.exports = connectToDB;
