const daysOfWeek = require('./daysOfWeek');
const { FITNESS_LEVELS, TARGET_PACES } = require('./constants');
const calculateLongRunDistance = require('./calculateLongRunDistance');
const { assignTrainingDays, PHASES } = require('./assignTrainingDays');
const getPhase = require('./getPhase');
const validateTrainingDays = require('./validateTrainingDays');
const initializeTrainingPlan = require('./initializeTrainingPlan');
const calculateWeeklyDistance = require('./calculateWeeklyDistance');
const addMarathonRace = require('./addMarathonRace');
const path = require('path');
const fs = require('fs');
const phaseMapping = require('./phaseMapping'); // Import phaseMapping

const trainingAdvicePath = path.resolve(__dirname, '../../../data/trainingAdvice.json');
const yogaFlowsPath = path.resolve(__dirname, '../../../data/yogaFlows.json');

const trainingAdvice = JSON.parse(fs.readFileSync(trainingAdvicePath, 'utf8'));
const yogaFlows = JSON.parse(fs.readFileSync(yogaFlowsPath, 'utf8'));

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

    // Calculate the actual total distance run in the week
    const actualWeeklyDistance = weekPlan.days.reduce((total, day) => total + (day.distance || 0), 0);
    weekPlan.weekKM = Math.round(actualWeeklyDistance * 10) / 10; // Update the weekly distance to match the actual total

    // Add detailed advice to the options array
    weekPlan.days.forEach(day => {
      if (day.title === 'Long Run') {
        const mappedPhase = phaseMapping[phase];
        const adviceData = trainingAdvice.trainingAdvice[targetTime];
        if (adviceData && adviceData[mappedPhase]) {
          const advice = adviceData[mappedPhase].advice;
          day.options = day.options || [];
          day.options.push(...advice);
          const randomTip = trainingAdvice.generalTips[Math.floor(Math.random() * trainingAdvice.generalTips.length)];
          day.options.push(`Tip: ${randomTip}`);
        }
      }

      if (day.title === 'Yoga') {
        const randomFlow = yogaFlows.yoga_flows[Math.floor(Math.random() * yogaFlows.yoga_flows.length)];
        day.options = day.options || [];
        day.options.push(randomFlow.description);
        day.options.push(...randomFlow.poses);
      }
    });

    plan[phase].push(weekPlan);

    if (phase !== 'RACE_WEEK') {
      currentWeeklyKM += (fitness.peakWeeklyKM - fitness.initialWeeklyKM) / (PHASES.BUILD.weeks + PHASES.PEAK.weeks);
    }
  }

  // Add the marathon race in the last week
  const lastWeek = plan['RACE_WEEK'][plan['RACE_WEEK'].length - 1];
  if (lastWeek) {
    // Clear existing activities in the last week
    lastWeek.days = [];

    // Add the marathon race activities
    addMarathonRace(lastWeek, trainingDays, paces, marathonDistance);
  }

  return plan;
};

module.exports = generateTrainingPlan;