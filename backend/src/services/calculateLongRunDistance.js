const PHASES = {
  BASE: { weeks: 4, mileageFactor: 0.5, speedFactor: 0.5, description: "Getting into the habit of running 3 times per week, getting used to rest and yoga days, and building some foundational strength and stamina." },
  BUILD: { weeks: 5, mileageFactor: 0.75, speedFactor: 0.75, description: "Improving endurance, stamina, speed, and fitness." },
  PEAK: { weeks: 3, mileageFactor: 1, speedFactor: 1, description: "Immediate preparation for the big race day." },
  TAPER: { weeks: 3, mileageFactor: 0.5, speedFactor: 0.5, description: "Ensuring you are healthy, not injured, and well-rested for the start line." },
  RACE_WEEK: { weeks: 1, mileageFactor: 0.5, speedFactor: 0.5, description: "Final preparation and race day." }
};

const calculateLongRunDistance = (week, phase) => {
  if (phase === 'BASE') {
    return 5 + Math.floor((week / PHASES.BASE.weeks) * 5); // Increase from 5 to 10 km
  } else if (phase === 'BUILD') {
    const buildWeek = week - PHASES.BASE.weeks;
    return 12 + Math.floor(((buildWeek - 1) / (PHASES.BUILD.weeks - 1)) * 13); // Increase from 12 to 25 km
  } else if (phase === 'PEAK') {
    const peakWeek = week - PHASES.BASE.weeks - PHASES.BUILD.weeks;
    if (peakWeek === 1) return 28;
    if (peakWeek === 2) return 32;
    if (peakWeek === 3) return 36;
  } else if (phase === 'TAPER') {
    const taperWeek = week - PHASES.BASE.weeks - PHASES.BUILD.weeks - PHASES.PEAK.weeks;
    if (taperWeek === 1) return 24;
    if (taperWeek === 2) return 20;
    if (taperWeek === 3) return 16;
  } else if (phase === 'RACE_WEEK') {
    return 5; // Short run in the race week
  }
  return 0;
};

module.exports = calculateLongRunDistance;