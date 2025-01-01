const daysOfWeek = require('./daysOfWeek');
const getRandomPhrase = require('./getRandomPhrase');

const addMarathonRace = (lastWeek, trainingDays, paces, marathonDistance) => {
  const getDayLabel = (dayIndex) => {
    const day = daysOfWeek.find(d => d.value === dayIndex);
    return day ? day.label : 'Unknown Day';
  };

  // Add a short 5k run
  lastWeek.days.push({
    day: trainingDays[0],
    label: getDayLabel(trainingDays[0]),
    title: 'Easy Run',
    description: `Run 5 km at ${paces.easy} pace in the conditions/environment of the marathon`,
    options: ["Keep it light and easy to stay fresh for the marathon"],
    distance: 5
  });

  // Add a yoga session
  lastWeek.days.push({
    day: trainingDays[1],
    label: getDayLabel(trainingDays[1]),
    title: 'Yoga',
    description: "Focus on recovery and mobility exercises",
    options: ["Enhance your flexibility and prevent injuries"],
    distance: 0
  });

  // Add the marathon race
  lastWeek.days.push({
    day: daysOfWeek.find(d => d.label === 'Sunday').value,
    label: 'Sunday',
    title: 'Marathon',
    description: `Run ${marathonDistance} km at your marathon pace`,
    options: ["This is it! Give it your all and enjoy the race"],
    distance: marathonDistance,
    icon: 'EmojiEvents' // Reference to the trophy icon
  });

  // Calculate the actual total distance run in the marathon week
  const actualWeeklyDistance = lastWeek.days.reduce((total, day) => total + (day.distance || 0), 0);
  lastWeek.weekKM = Math.round(actualWeeklyDistance * 10) / 10; // Update the weekly distance to match the actual total
};

module.exports = addMarathonRace;