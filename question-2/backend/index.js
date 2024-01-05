const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const inventoryRoutes = require('./src/routes/inventoryRoutes');
// const orderRoutes = require('./src/routes/orderRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error:', err));
db.once('open', () => {
    console.log('Connected to MongoDB');

    app.use(bodyParser.json());

    app.use('/api/inventory', inventoryRoutes);
    // app.use('/api/orders', orderRoutes);
    app.use('/api/users', userRoutes);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
