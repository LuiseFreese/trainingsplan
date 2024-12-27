const express = require('express');
const router = express.Router();
const { generateICS } = require('../src/services/icsService'); // Corrected path

router.get('/generate-ics', async (req, res) => {
    try {
        const icsFile = await generateICS();
        res.setHeader('Content-Disposition', 'attachment; filename=trainingsplan.ics');
        res.setHeader('Content-Type', 'text/calendar');
        res.send(icsFile);
    } catch (error) {
        res.status(500).send('Error generating ICS file');
    }
});

module.exports = router;