const express = require('express');
const router = express.Router();
const jsonRoutes = require('./jsonRoutes');
const icsRoutes = require('./icsRoutes');
const trainingPlanRoutes = require('./trainingPlanRoutes');

// Use the JSON routes
router.use('/generate-json', jsonRoutes);

// Use the ICS routes
router.use('/generate-ics', icsRoutes);

// Use the Training Plan routes
router.use('/generate-training-plan', trainingPlanRoutes);

module.exports = router;