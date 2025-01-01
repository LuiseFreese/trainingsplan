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
  
  module.exports = { FITNESS_LEVELS, TARGET_PACES };