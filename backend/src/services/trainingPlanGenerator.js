const generateTrainingPlan = (targetTime, fitnessLevel, trainingDays) => {
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

  const PHASES = {
    BASE: { weeks: 4, mileageFactor: 0.5, speedFactor: 0.5 },
    BUILD: { weeks: 8, mileageFactor: 0.75, speedFactor: 0.75 },
    PEAK: { weeks: 3, mileageFactor: 1, speedFactor: 1 },
    TAPER: { weeks: 1, mileageFactor: 0.5, speedFactor: 0.5 },
  };

  // const ICONS = {
  //   Rest: 'WeekendIcon',
  //   'Long Run': 'DirectionsRunIcon',
  //   Intervals: 'RepeatIcon',
  //   'Tempo Run': 'DirectionsRunIcon',
  //   Yoga: 'SelfImprovementIcon',
  //   'Easy Run': 'DirectionsRunIcon',
  // };

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

  const intervalTemplates = [
    { intervals: 4, distance: 0.4, rest: '2:00 min', restType: 'easy pace' },
    { intervals: 6, distance: 0.6, rest: '1:30 min', restType: 'easy pace' },
    { intervals: 8, distance: 0.8, rest: '1:00 min', restType: 'easy pace' },
    { intervals: 10, distance: 1.0, rest: '1:00 min', restType: 'easy pace' },
  ];

  const longRunPhrases = [
    "Build your endurance and practice your nutrition and hydration strategy",
    "Strengthen your stamina and get used to longer distances",
    "Push your limits and prepare for race day with this long run"
  ];

  const tempoRunPhrases = [
    "Boost your speed endurance and get comfortable with faster paces",
    "Increase your lactate threshold and improve your race pace",
    "Challenge yourself with this tempo run to enhance your speed"
  ];

  const intervalPhrases = [
    "Improve your speed and running economy",
    "Sharpen your speed and agility",
    "Enhance your performance and break through your speed barriers"
  ];

  const yogaPhrases = [
    "Enhance your flexibility and prevent injuries",
    "Improve your mobility and recovery",
    "Focus on stretching and relaxation to aid your recovery"
  ];

  const easyRunPhrases = [
    "Recover and prepare for your next hard session",
    "Take it easy today to let your body recover and rebuild",
    "Enjoy a relaxed run to help your muscles recover"
  ];

  const restPhrases = [
    "Rest and recovery don't need to be earned - they are a prerequisite for your performance",
    "Rest. It's part of the plan.",
    "Rest. You need it.",
    "Happy Rest Day",
   "Rest and recovery don't need to be earned - they are a prerequisite for your performance"
  ];

  const daysOfWeek = [
    { label: 'Monday', value: 0 },
    { label: 'Tuesday', value: 1 },
    { label: 'Wednesday', value: 2 },
    { label: 'Thursday', value: 3 },
    { label: 'Friday', value: 4 },
    { label: 'Saturday', value: 5 },
    { label: 'Sunday', value: 6 },
  ];
  
  const assignTrainingDays = (weekPlan, weeklyDistance, phase, week) => {
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
          description = `Run ${intervalTemplate.intervals} intervals of ${intervalTemplate.distance} km at ${intervalPace} pace. Each interval is followed by ${intervalTemplate.rest} rest at ${intervalTemplate.restType}`;
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

  for (let week = 1; week <= totalWeeks; week++) {
    const phase = getPhase(week);
    const weeklyDistance = currentWeeklyKM * PHASES[phase].mileageFactor;
    const weekPlan = { weekNumber: week, weekKM: Math.round(weeklyDistance), days: [] };

    assignTrainingDays(weekPlan, weeklyDistance, phase, week);

    plan[phase].push(weekPlan);

    if (phase !== 'TAPER') {
      currentWeeklyKM += (fitness.peakWeeklyKM - fitness.initialWeeklyKM) / (totalWeeks - PHASES.TAPER.weeks);
    }
  }

  // Add the marathon race in the last week
  plan['TAPER'][plan['TAPER'].length - 1].days = [{
    day: trainingDays[trainingDays.length - 1],
    title: 'Marathon',
    description: `Run ${marathonDistance} km at your marathon pace`,
    options: ["This is it! Give it your all and enjoy the race"]
    // icon: ICONS['Long Run'],
  }];

  return plan;
};

module.exports = { generateTrainingPlan };