/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: 'mysql'
};
