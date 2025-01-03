const express = require('express');
const router = express.Router();
const path = require('path');

// Use an absolute path to the icsService.js file
const { generateICS } = require(path.resolve(__dirname, '../src/services/icsService'));

router.get('/', async (req, res) => {
    const trainingPlanFolder = req.query.folder || '500'; // Default to '500' if not provided
    const startDate = new Date(req.query.startDate); // Use the provided start date
    const fitnessLevel = req.query.fitnessLevel || 'beginner'; // Default to 'beginner' if not provided
    const targetTime = req.query.targetTime || '5:00'; // Default to '5:00' if not provided
    try {
        console.log(`Generating ICS for folder: ${trainingPlanFolder}, start date: ${startDate}, fitness level: ${fitnessLevel}, target time: ${targetTime}`);
        const icsData = await generateICS(trainingPlanFolder, startDate, fitnessLevel, targetTime);
        res.setHeader('Content-Disposition', `attachment; filename=trainingplan-M-${trainingPlanFolder}.ics`);
        res.setHeader('Content-Type', 'text/calendar');
        res.send(icsData);
    } catch (error) {
        console.error('Error generating ICS:', error);
        res.status(500).send('Error generating ICS');
    }
});

module.exports = router;