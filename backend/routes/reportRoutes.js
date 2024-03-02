/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

const express = require('express');
const router = express.Router();
const db = require('../models');
const Report = db.report;

// Endpoint to fetch all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).send('Error retrieving reports: ' + error);
    }
});

// Create a new report
router.post('/', async (req, res) => {
    try {
        const newReport = await Report.create(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).send('Error creating report: ' + error);
    }
});

// Get a single report by its ID
router.get('/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching report: ' + error);
    }
});

// Update a report by its ID
router.put('/:id', async (req, res) => {
    try {
        const updated = await Report.update(req.body, {
            where: { report_id: req.params.id }
        });
        if (updated) {
            res.status(200).send('Report updated successfully');
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(500).send('Error updating report: ' + error);
    }
});

// Delete a report by its ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Report.destroy({
            where: { report_id: req.params.id }
        });
        if (deleted) {
            res.status(200).send('Report deleted successfully');
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting report: ' + error);
    }
});

module.exports = router;
