/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

// Importing database configurations and the Sequelize ORM

const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

// Initializing Sequelize with the database configurations

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const db = {};
// Assigning Sequelize and the initialized instance to the db object

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Importing models and initializing them with Sequelize

db.report = require('./report.model.js')(sequelize, Sequelize);
db.vulnerability = require('./vulnerability.model.js')(sequelize, Sequelize);
db.reportVulnerabilities = require('./reportVulnerabilities.model.js')(sequelize, Sequelize);
// Establishing many-to-many relationship between Report and Vulnerability

db.report.belongsToMany(db.vulnerability, {
    through: db.reportVulnerabilities,
    foreignKey: 'report_id',
    otherKey: 'vulnerability_id',
});
db.vulnerability.belongsToMany(db.report, {
    through: db.reportVulnerabilities,
    foreignKey: 'vulnerability_id',
    otherKey: 'report_id',
});

// Establishing relations for the join table
db.reportVulnerabilities.belongsTo(db.report, {
    foreignKey: 'report_id',
    as: 'report'
});
db.reportVulnerabilities.belongsTo(db.vulnerability, {
    foreignKey: 'vulnerability_id',
    as: 'vulnerability'
});

module.exports = db;
