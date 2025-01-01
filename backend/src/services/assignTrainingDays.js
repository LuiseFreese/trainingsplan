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

  // Handle weekend logic
  const saturdayIndex = daysOfWeek.find(day => day.label === 'Saturday').value;
  const sundayIndex = daysOfWeek.find(day => day.label === 'Sunday').value;

  if (trainingDays.includes(saturdayIndex) && trainingDays.includes(sundayIndex)) {
    // Both Saturday and Sunday are selected
    const longRunDay = Math.random() < 0.5 ? saturdayIndex : sundayIndex;
    const yogaDay = longRunDay === saturdayIndex ? sundayIndex : saturdayIndex;

    weekPlan.days.push({
      day: longRunDay,
      label: daysOfWeek[longRunDay].label,
      title: 'Long Run',
      description: `Run ${longRunDistance} km at ${paces.long} pace`,
      options: [getRandomPhrase(longRunPhrases)],
      distance: longRunDistance
    });

    weekPlan.days.push({
      day: yogaDay,
      label: daysOfWeek[yogaDay].label,
      title: 'Yoga',
      description: "Focus on recovery and mobility exercises",
      options: [getRandomPhrase(yogaPhrases)],
      distance: 0
    });

    longRunAssigned = true;
    yogaAssigned = true;
  } else if (trainingDays.includes(saturdayIndex)) {
    // Only Saturday is selected
    weekPlan.days.push({
      day: saturdayIndex,
      label: daysOfWeek[saturdayIndex].label,
      title: 'Long Run',
      description: `Run ${longRunDistance} km at ${paces.long} pace`,
      options: [getRandomPhrase(longRunPhrases)],
      distance: longRunDistance
    });

    longRunAssigned = true;
  } else if (trainingDays.includes(sundayIndex)) {
    // Only Sunday is selected
    weekPlan.days.push({
      day: sundayIndex,
      label: daysOfWeek[sundayIndex].label,
      title: 'Long Run',
      description: `Run ${longRunDistance} km at ${paces.long} pace`,
      options: [getRandomPhrase(longRunPhrases)],
      distance: longRunDistance
    });

    longRunAssigned = true;
  }

  for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
    const day = daysOfWeek[dayIndex];
    if (day.value === saturdayIndex || day.value === sundayIndex) continue; // Skip Saturday and Sunday as they are already handled

    let description = "";
    let distance = 0;
    let options = [];
    let title = "";
    let label = day.label;

    if (trainingDays.includes(day.value)) {
      if (!longRunAssigned) {
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
        const restTimeInMinutes = parseFloat(intervalTemplate.rest.split(':')[0]) + parseFloat(intervalTemplate.rest.split(':')[1]) / 60;
        const restDistance = restTimeInMinutes / parseFloat(paces.easy.split(' ')[0]);
        const totalIntervalDistance = intervalTemplate.intervals * intervalTemplate.distance + intervalTemplate.intervals * restDistance;
        distance = Math.round(totalIntervalDistance * 10) / 10; // Round to 1 decimal place
        description = `Run ${intervalTemplate.intervals} intervals of ${intervalTemplate.distance} km at ${intervalPace} pace. Each interval is followed by ${intervalTemplate.rest} rest at ${paces.easy} pace`;
        options.push(`Total distance: ${distance} km`);
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

    weekPlan.days.push({ day: day.value, label, title, description, options, distance });
  }

  // Ensure all days are included in the correct order
  for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
    const day = daysOfWeek[dayIndex];
    if (!weekPlan.days.find(d => d.day === day.value)) {
      weekPlan.days.push({
        day: day.value,
        label: day.label,
        title: 'Rest Day',
        description: getRandomPhrase(restPhrases),
        options: [],
        distance: 0
      });
    }
  }

  // Sort days to ensure correct order (Monday to Sunday)
  weekPlan.days.sort((a, b) => a.day - b.day);
};

module.exports = { assignTrainingDays, PHASES };