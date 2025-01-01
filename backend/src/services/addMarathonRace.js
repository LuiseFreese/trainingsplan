const daysOfWeek = require('./daysOfWeek');

const addMarathonRace = (lastWeek, trainingDays, paces, marathonDistance) => {
  lastWeek.days = lastWeek.days.filter(day => day.title !== 'Rest Day'); // Remove rest days

  const getDayLabel = (dayIndex) => {
    const day = daysOfWeek.find(d => d.value === dayIndex);
    return day ? day.label : 'Unknown Day';
  };

  lastWeek.days.push({
    day: trainingDays[0],
    label: getDayLabel(trainingDays[0]),
    title: 'Easy Run',
    description: `Run 5 km at ${paces.easy} pace in the conditions/environment of the marathon`,
    options: ["Keep it light and easy to stay fresh for the marathon"],
  });
  lastWeek.days.push({
    day: trainingDays[1],
    label: getDayLabel(trainingDays[1]),
    title: 'Yoga',
    description: "Focus on recovery and mobility exercises",
    options: ["Enhance your flexibility and prevent injuries"],
  });
  lastWeek.days.push({
    day: trainingDays[trainingDays.length - 1],
    label: getDayLabel(trainingDays[trainingDays.length - 1]),
    title: 'Marathon',
    description: `Run ${marathonDistance} km at your marathon pace`,
    options: ["This is it! Give it your all and enjoy the race"],
    icon: 'EmojiEvents' // Reference to the trophy icon
  });
};

module.exports = addMarathonRace;