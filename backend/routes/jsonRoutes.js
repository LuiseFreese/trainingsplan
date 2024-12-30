const express = require('express');
const router = express.Router();
const { generateJSON } = require('../src/services/jsonService');

router.get('/', async (req, res) => {
    const trainingPlanFolder = req.query.folder || '430'; // Default to '430' if not provided
    try {
        const weekData = await generateJSON(trainingPlanFolder);
        res.json(weekData);
    } catch (error) {
        console.error('Error generating JSON:', error);
        res.status(500).send('Error generating JSON');
    }
});

module.exports = router;