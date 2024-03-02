/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

// Exporting a function that defines and returns the Report model

module.exports = (sequelize, Sequelize) => {
        // Defining the Report model with its attributes and their data types
            const Report = sequelize.define("report", {
                // Primary key attribute - auto incrementing integer
                report_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                        // Contract name attribute - string of maximum length 255, cannot be null

                contract_name: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                        // Audit date attribute - date data type, defaults to current date and time

                audit_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW
                }
            });

            return Report;
        };
