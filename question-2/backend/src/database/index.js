const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/mindx';

const connectToDB = async () => {
    try {
        await mongoose.connect(url);

        console.log('Coonected successfully to server');
    } catch (error) {
        console.log('Connected error: ', error);
    }
};

module.exports = connectToDB;
