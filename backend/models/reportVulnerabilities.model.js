/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

// Exporting a function that defines and returns the ReportVulnerabilities model

module.exports = (sequelize, Sequelize) => {
        // Defining the ReportVulnerabilities model with its attributes and their data types

    const ReportVulnerabilities = sequelize.define("reportVulnerabilities", {

                // Primary key attribute - auto incrementing integer
                report_vulnerability_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                report_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'reports', 
                        key: 'report_id'
                    }
                },
                vulnerability_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'vulnerabilities', 
                        key: 'vulnerability_id'
                    }
                }
            });

            return ReportVulnerabilities;
        };
