const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { generateTrainingPlan } = require('../src/services/trainingPlanGenerator');

router.get('/', (req, res) => {
    const targetTime = req.query.targetTime || '4:30'; // Default to '4:30' if not provided
    const fitnessLevel = req.query.fitnessLevel || 'intermediate'; // Default to 'intermediate' if not provided
    const trainingDays = req.query.trainingDays ? req.query.trainingDays.split(',').map(Number) : [2, 4, 5, 7]; // Default to [2, 4, 5, 7] if not provided

    try {
        const plan = generateTrainingPlan(targetTime, fitnessLevel, trainingDays);
        const outputDir = path.join(__dirname, `../../assets/output`);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputFilePath = path.join(outputDir, `gen-trainingplan-M-${targetTime.replace(':', '')}.json`);
        fs.writeFileSync(outputFilePath, JSON.stringify(plan, null, 2));
        console.log(`Training plan JSON file written to: ${outputFilePath}`);
        res.json(plan);
    } catch (error) {
        console.error('Error generating training plan:', error);
        res.status(500).send('Error generating training plan');
    }
});

module.exports = router;