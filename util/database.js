const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-udemy', 'root', 'amit199@', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
