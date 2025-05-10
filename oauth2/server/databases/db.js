const path = require('path');
const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
});

db.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err.original.code);
        process.exit(1);
    });

module.exports = db;
