const {
  longRunPhrases,
  tempoRunPhrases,
  intervalPhrases,
  easyRunPhrases,
  restPhrases,
  yogaPhrases
} = require('./phrases');

const daysOfWeek = [
  { label: 'Monday', value: 0 },
  { label: 'Tuesday', value: 1 },
  { label: 'Wednesday', value: 2 },
  { label: 'Thursday', value: 3 },
  { label: 'Friday', value: 4 },
  { label: 'Saturday', value: 5 },
  { label: 'Sunday', value: 6 },
];

const PHASES = {
  BASE: { weeks: 4, mileageFactor: 0.5, speedFactor: 0.5, description: "Getting into the habit of running 3 times per week, getting used to rest and yoga days, and building some foundational strength and stamina." },
  BUILD: { weeks: 8, mileageFactor: 0.75, speedFactor: 0.75, description: "Improving endurance, stamina, speed, and fitness." },
  PEAK: { weeks: 3, mileageFactor: 1, speedFactor: 1, description: "Immediate preparation for the big race day." },
  TAPER: { weeks: 1, mileageFactor: 0.5, speedFactor: 0.5, description: "Ensuring you are healthy, not injured, and well-rested for the start line." },
};

const intervalTemplates = [
  { intervals: 6, distance: 0.4, rest: '2:00 min' },
  { intervals: 5, distance: 0.6, rest: '1:30 min' },
  { intervals: 4, distance: 0.8, rest: '1:00 min' },
  { intervals: 3, distance: 1.0, rest: '1:00 min' },
];

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
  }
  return 0;
};

const assignTrainingDays = (weekPlan, weeklyDistance, phase, week, paces, trainingDays) => {
  const longRunDistance = calculateLongRunDistance(week, phase);
  const tempoRunDistance = Math.round(weeklyDistance * 0.2);
  const intervalTemplate = intervalTemplates[week % intervalTemplates.length];
  const intervalDistance = Math.round(intervalTemplate.intervals * intervalTemplate.distance);
  const easyRunDistance = Math.round(weeklyDistance * 0.2);

  let longRunAssigned = false;
  let tempoRunAssigned = false;
  let intervalAssigned = false;
  let yogaAssigned = false;

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    let description = "";
    let distance = 0;
    let options = [];
    let title = "";
    let label = daysOfWeek[dayIndex].label;

    if (trainingDays.includes(dayIndex)) {
      if (!longRunAssigned && (dayIndex === trainingDays[trainingDays.length - 1] || phase === 'TAPER')) {
        distance = longRunDistance;
        description = `Run ${distance} km at ${paces.long} pace`;
        options.push(longRunPhrases[week % longRunPhrases.length]);
        title = 'Long Run';
        longRunAssigned = true;
      } else if (!tempoRunAssigned) {
        distance = tempoRunDistance;
        description = `Run ${distance} km at ${paces.tempo} pace`;
        options.push(tempoRunPhrases[week % tempoRunPhrases.length]);
        title = 'Tempo Run';
        tempoRunAssigned = true;
      } else if (!intervalAssigned) {
        const intervalPace = paces.interval[week % paces.interval.length];
        description = `Run ${intervalTemplate.intervals} intervals of ${intervalTemplate.distance} km at ${intervalPace} pace. Each interval is followed by ${intervalTemplate.rest} rest at ${paces.easy} pace`;
        options.push(`Total distance: ${intervalDistance} km`);
        options.push(intervalPhrases[week % intervalPhrases.length]);
        title = 'Intervals';
        intervalAssigned = true;
      } else if (!yogaAssigned) {
        description = "Focus on recovery and mobility exercises";
        options.push(yogaPhrases[week % yogaPhrases.length]);
        title = 'Yoga';
        yogaAssigned = true;
      } else {
        distance = easyRunDistance;
        description = `Run ${distance} km at ${paces.easy} pace`;
        options.push(easyRunPhrases[week % easyRunPhrases.length]);
        title = 'Easy Run';
      }
    } else {
      description = restPhrases[week % restPhrases.length];
      title = 'Rest Day';
    }

    weekPlan.days.push({ day: dayIndex, label, title, description, options });
  }
};

const generateTrainingPlan = (targetTime, fitnessLevel, trainingDays) => {
  if (trainingDays.length < 3) {
    throw new Error("Insufficient training days provided. Please provide at least 3 training days.");
  }

  const totalWeeks = 16;
  const marathonDistance = 42.195; // Marathon distance in kilometers

  const FITNESS_LEVELS = {
    beginner: { initialWeeklyKM: 20, peakWeeklyKM: 50, intervalRest: '2:00 min', intervalDistance: 0.4 },
    intermediate: { initialWeeklyKM: 30, peakWeeklyKM: 70, intervalRest: '1:30 min', intervalDistance: 0.6 },
    advanced: { initialWeeklyKM: 40, peakWeeklyKM: 90, intervalRest: '1:00 min', intervalDistance: 1.0 },
  };

  const TARGET_PACES = {
    '4:00': { easy: '6:00 min/km', tempo: '5:00 min/km', interval: ['4:30 min/km', '4:45 min/km'], long: '6:30 min/km' },
    '4:30': { easy: '6:30 min/km', tempo: '5:30 min/km', interval: ['5:00 min/km', '5:15 min/km'], long: '7:00 min/km' },
    '5:00': { easy: '7:00 min/km', tempo: '6:00 min/km', interval: ['5:30 min/km', '5:45 min/km'], long: '7:30 min/km' },
  };

  const fitness = FITNESS_LEVELS[fitnessLevel];
  const paces = TARGET_PACES[targetTime];

  const plan = {
    BASE: [],
    BUILD: [],
    PEAK: [],
    TAPER: [],
  };
  let currentWeeklyKM = fitness.initialWeeklyKM;

  const getPhase = (week) => {
    if (week <= PHASES.BASE.weeks) return 'BASE';
    if (week <= PHASES.BASE.weeks + PHASES.BUILD.weeks) return 'BUILD';
    if (week <= PHASES.BASE.weeks + PHASES.BUILD.weeks + PHASES.PEAK.weeks) return 'PEAK';
    return 'TAPER';
  };

  for (let week = 1; week <= totalWeeks; week++) {
    const phase = getPhase(week);
    const weeklyDistance = currentWeeklyKM * PHASES[phase].mileageFactor;
    const weekPlan = { weekNumber: week, weekKM: Math.round(weeklyDistance), days: [], phaseDescription: PHASES[phase].description };

    assignTrainingDays(weekPlan, weeklyDistance, phase, week, paces, trainingDays);

    plan[phase].push(weekPlan);

    if (phase !== 'TAPER') {
      currentWeeklyKM += (fitness.peakWeeklyKM - fitness.initialWeeklyKM) / (PHASES.BUILD.weeks + PHASES.PEAK.weeks);
    }
  }

  // Add the marathon race in the last week
  const lastWeek = plan['TAPER'][plan['TAPER'].length - 1];
  lastWeek.days = lastWeek.days.filter(day => day.title !== 'Rest Day'); // Remove rest days

  lastWeek.days.push({
    day: trainingDays[0],
    label: daysOfWeek[trainingDays[0]].label,
    title: 'Easy Run',
    description: `Run 5 km at ${paces.easy} pace in the conditions/environment of the marathon`,
    options: ["Keep it light and easy to stay fresh for the marathon"],
  });
  lastWeek.days.push({
    day: trainingDays[1],
    label: daysOfWeek[trainingDays[1]].label,
    title: 'Yoga',
    description: "Focus on recovery and mobility exercises",
    options: ["Enhance your flexibility and prevent injuries"],
  });
  lastWeek.days.push({
    day: trainingDays[trainingDays.length - 1],
    //label: daysOfWeek[trainingDays[trainingDays.length - 1]].label,
    title: 'Marathon',
    description: `Run ${marathonDistance} km at your marathon pace`,
    options: ["This is it! Give it your all and enjoy the race"],
    icon: 'EmojiEvents' // Reference to the trophy icon
  });

  return plan;
};

module.exports = { generateTrainingPlan };