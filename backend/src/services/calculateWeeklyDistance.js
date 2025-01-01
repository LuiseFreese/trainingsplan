const { PHASES } = require('./assignTrainingDays');
const getPhase = require('./getPhase');

const calculateWeeklyDistance = (week, currentWeeklyKM, fitness) => {
  const phase = getPhase(week);
  const weeklyDistance = currentWeeklyKM * PHASES[phase].mileageFactor;
  return { phase, weeklyDistance };
};

module.exports = calculateWeeklyDistance;