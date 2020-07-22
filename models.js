const Sequelize = require('sequelize');
const db = new Sequelize('plantr', 'postgres', 'jh810506', {
    dialect: 'postgres',
    logging: false,
});

module.exports = db;