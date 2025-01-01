const daysOfWeek = require('./daysOfWeek');
const { FITNESS_LEVELS, TARGET_PACES } = require('./constants');
const calculateLongRunDistance = require('./calculateLongRunDistance');
const { assignTrainingDays, PHASES } = require('./assignTrainingDays');
const getPhase = require('./getPhase');
const validateTrainingDays = require('./validateTrainingDays');
const initializeTrainingPlan = require('./initializeTrainingPlan');
const calculateWeeklyDistance = require('./calculateWeeklyDistance');
const addMarathonRace = require('./addMarathonRace');

const generateTrainingPlan = (targetTime, fitnessLevel, trainingDays) => {
  validateTrainingDays(trainingDays);

  const totalWeeks = 16;
  const marathonDistance = 42.195; // Marathon distance in kilometers

  const fitness = FITNESS_LEVELS[fitnessLevel];
  const paces = TARGET_PACES[targetTime];

  const plan = initializeTrainingPlan();
  let currentWeeklyKM = fitness.initialWeeklyKM;

  for (let week = 1; week <= totalWeeks; week++) {
    const { phase, weeklyDistance } = calculateWeeklyDistance(week, currentWeeklyKM, fitness);
    const weekPlan = { weekNumber: week, weekKM: Math.round(weeklyDistance), days: [], phaseDescription: PHASES[phase].description };

    assignTrainingDays(weekPlan, weeklyDistance, phase, week, paces, trainingDays);

    plan[phase].push(weekPlan);

    if (phase !== 'TAPER') {
      currentWeeklyKM += (fitness.peakWeeklyKM - fitness.initialWeeklyKM) / (PHASES.BUILD.weeks + PHASES.PEAK.weeks);
    }
  }

  // Add the marathon race in the last week
  const lastWeek = plan['TAPER'][plan['TAPER'].length - 1];
  addMarathonRace(lastWeek, trainingDays, paces, marathonDistance);

  return plan;
};

module.exports = generateTrainingPlan;