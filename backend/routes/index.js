const express = require('express');
const router = express.Router();
const icsRoutes = require('./icsRoutes');
const trainingPlanRoutes = require('./trainingPlanRoutes');

// Remove the reference to jsonRoutes
// const jsonRoutes = require('./jsonRoutes');

// router.use('/json', jsonRoutes);
router.use('/ics', icsRoutes);
router.use('/generate-training-plan', trainingPlanRoutes);

module.exports = router;