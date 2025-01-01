const {
  longRunPhrases,
  tempoRunPhrases,
  intervalPhrases,
  easyRunPhrases,
  restPhrases,
  yogaPhrases
} = require('./phrases');
const getRandomPhrase = require('./getRandomPhrase');

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

const calculateLongRunDistance = require('./calculateLongRunDistance');

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
        options.push(getRandomPhrase(longRunPhrases));
        title = 'Long Run';
        longRunAssigned = true;
      } else if (!tempoRunAssigned) {
        distance = tempoRunDistance;
        description = `Run ${distance} km at ${paces.tempo} pace`;
        options.push(getRandomPhrase(tempoRunPhrases));
        title = 'Tempo Run';
        tempoRunAssigned = true;
      } else if (!intervalAssigned) {
        const intervalPace = paces.interval[week % paces.interval.length];
        description = `Run ${intervalTemplate.intervals} intervals of ${intervalTemplate.distance} km at ${intervalPace} pace. Each interval is followed by ${intervalTemplate.rest} rest at ${paces.easy} pace`;
        options.push(`Total distance: ${intervalDistance} km`);
        options.push(getRandomPhrase(intervalPhrases));
        title = 'Intervals';
        intervalAssigned = true;
      } else if (!yogaAssigned) {
        description = "Focus on recovery and mobility exercises";
        options.push(getRandomPhrase(yogaPhrases));
        title = 'Yoga';
        yogaAssigned = true;
      } else {
        distance = easyRunDistance;
        description = `Run ${distance} km at ${paces.easy} pace`;
        options.push(getRandomPhrase(easyRunPhrases));
        title = 'Easy Run';
      }
    } else {
      description = getRandomPhrase(restPhrases);
      title = 'Rest Day';
    }

    weekPlan.days.push({ day: dayIndex, label, title, description, options });
  }
};

module.exports = { assignTrainingDays, PHASES };