const { PHASES } = require('./assignTrainingDays');

const getPhase = (week) => {
  if (week <= PHASES.BASE.weeks) return 'BASE';
  if (week <= PHASES.BASE.weeks + PHASES.BUILD.weeks) return 'BUILD';
  if (week <= PHASES.BASE.weeks + PHASES.BUILD.weeks + PHASES.PEAK.weeks) return 'PEAK';
  return 'TAPER';
};

module.exports = getPhase;