const express = require('express');
const router = express.Router();
const jsonRoutes = require('./jsonRoutes');
const icsRoutes = require('./icsRoutes');
const trainingPlanRoutes = require('./trainingPlanRoutes');

router.use('/json', jsonRoutes);
router.use('/ics', icsRoutes);
router.use('/generate-training-plan', trainingPlanRoutes);

module.exports = router;