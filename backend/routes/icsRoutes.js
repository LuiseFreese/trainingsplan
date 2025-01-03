const express = require('express');
const router = express.Router();
const path = require('path');

// Use an absolute path to the icsService.js file
const { generateICS } = require(path.resolve(__dirname, '../src/services/icsService'));

router.get('/', async (req, res) => {
    const trainingPlanFolder = req.query.folder || '500'; // Default to '500' if not provided
    const startDate = new Date(req.query.startDate || '2025-01-01'); // Default to January 1, 2025 if not provided
    try {
        const icsData = await generateICS(trainingPlanFolder, startDate);
        res.setHeader('Content-Disposition', `attachment; filename=trainingplan-M-${trainingPlanFolder}.ics`);
        res.setHeader('Content-Type', 'text/calendar');
        res.send(icsData);
    } catch (error) {
        console.error('Error generating ICS:', error);
        res.status(500).send('Error generating ICS');
    }
});

module.exports = router;