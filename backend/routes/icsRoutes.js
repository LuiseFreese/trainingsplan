const express = require('express');
const router = express.Router();
const { generateICS } = require('../src/services/icsService');

router.get('/', async (req, res) => {
    const trainingPlanFolder = req.query.folder || '430'; // Default to '430' if not provided
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