const express = require('express');
const connectToDB = require('./src/database');
const importData = require('./src/utils/importMockData');
const router = require('./src/routes');

const app = express();

app.use(express.json());

connectToDB()
    .then(async () => {
        await importData();

        const PORT = 3000;

        app.use('/api', router);

        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to database:', error);
    });
