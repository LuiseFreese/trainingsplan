// Marathon Training Plan Generator

function generateTrainingPlan(targetTime, fitnessLevel, trainingDays) {
  const basePaces = {
    "4:00": {
      easy: "6:40 min/km",
      tempo: "5:50 min/km",
      longRun: "7:00 min/km",
    },
    "4:30": {
      easy: "7:20 min/km",
      tempo: "6:20 min/km",
      longRun: "7:40 min/km",
    },
    "5:00": {
      easy: "8:00 min/km",
      tempo: "7:10 min/km",
      longRun: "8:20 min/km",
    },
  };

  const baseDistances = {
    beginner: 20,
    intermediate: 30,
    advanced: 40,
  };

  const progressionWeeks = [
    { multiplier: 1 },
    { multiplier: 1.1 },
    { multiplier: 1.2 },
    { multiplier: 0.8 }, // Recovery Week
  ];

  const daysTemplate = [
    { type: "rest", title: "Rest or Mobility" },
    { type: "tempo", title: "Tempo Run" },
    { type: "easy", title: "Easy Run" },
    { type: "intervals", title: "Intervals" },
    { type: "rest", title: "Rest or Yoga" },
    { type: "easy", title: "Easy Run" },
    { type: "long", title: "Long Run" },
  ];

  const paces = basePaces[targetTime];
  const baseDistance = baseDistances[fitnessLevel];

  function getWeeklyPlan(weekNumber) {
    const phase = getPhase(weekNumber);
    const progression = progressionWeeks[weekNumber % progressionWeeks.length].multiplier;
    const weeklyDistance = Math.round(baseDistance * progression);

    const weekPlan = { weekNumber: weekNumber + 1, weekKM: weeklyDistance, days: [] };
    let remainingDistance = weeklyDistance;

    daysTemplate.forEach((day, index) => {
      const dayIndex = index + 1; // Adjust to 1-based index
      if (!trainingDays.includes(dayIndex)) {
        weekPlan.days.push({ day: dayIndex, title: "Rest", description: "Take it easy today.", options: ["Purpose: Recovery"] });
        return;
      }

      let description = "";
      let distance = 0;
      let options = [];

      switch (day.type) {
        case "rest":
          description = "Focus on recovery and mobility exercises.";
          options.push("Purpose: Recovery");
          break;
        case "tempo":
          distance = Math.min(weeklyDistance * 0.2, remainingDistance * 0.2);
          description = `Run ${distance.toFixed(1)} km at ${paces.tempo}.`;
          options.push("Purpose: Build speed and stamina");
          break;
        case "easy":
          distance = Math.min(weeklyDistance * 0.1, remainingDistance * 0.1);
          description = `Run ${distance.toFixed(1)} km at ${paces.easy}.`;
          options.push("Purpose: Build base mileage and aid recovery");
          break;
        case "intervals":
          distance = Math.min(weeklyDistance * 0.15, remainingDistance * 0.15);
          description = `Do intervals: 5x 800m at ${paces.tempo} with 400m recovery.`;
          options.push("Purpose: Improve speed and endurance");
          break;
        case "long":
          distance = remainingDistance;
          description = `Run ${distance.toFixed(1)} km at ${paces.longRun}.`;
          options.push("Purpose: Build endurance");
          break;
      }

      remainingDistance -= distance;
      weekPlan.days.push({ day: dayIndex, title: day.title, description, options });
    });

    return { phase, weekPlan };
  }

  function getPhase(weekNumber) {
    if (weekNumber < 4) {
      return "Base Building Phase";
    } else if (weekNumber < 8) {
      return "Build Phase";
    } else if (weekNumber < 12) {
      return "Peak Phase";
    } else {
      return "Taper Phase";
    }
  }

  function generateWeeks(totalWeeks) {
    const plan = {
      "Base Building Phase": [],
      "Build Phase": [],
      "Peak Phase": [],
      "Taper Phase": []
    };

    for (let i = 0; i < totalWeeks - 1; i++) {
      const { phase, weekPlan } = getWeeklyPlan(i);
      plan[phase].push(weekPlan);
    }

    // Add the last week with the marathon race day
    const lastWeek = {
      weekNumber: 16,
      weekKM: 42.2,
      days: [
        {
          day: 1,
          title: "Rest",
          description: "Take it easy today.",
          options: ["Purpose: Recovery"]
        },
        {
          day: 2,
          title: "Tempo Run",
          description: `Run 4.8 km at ${paces.tempo}.`,
          options: ["Purpose: Build speed and stamina"]
        },
        {
          day: 3,
          title: "Rest",
          description: "Take it easy today.",
          options: ["Purpose: Recovery"]
        },
        {
          day: 4,
          title: "Intervals",
          description: `Do intervals: 5x 800m at ${paces.tempo} with 400m recovery.`,
          options: ["Purpose: Improve speed and endurance"]
        },
        {
          day: 5,
          title: "Rest or Yoga",
          description: "Focus on recovery and mobility exercises.",
          options: ["Purpose: Recovery"]
        },
        {
          day: 6,
          title: "Rest",
          description: "Take it easy today.",
          options: ["Purpose: Recovery"]
        },
        {
          day: 7,
          title: "Race Day",
          description: "Run the marathon! 42.2 km",
          options: ["Purpose: Complete the marathon"]
        }
      ]
    };
    plan["Taper Phase"].push(lastWeek);

    return plan;
  }

  return generateWeeks(16); // Generate a 16-week plan
}

module.exports = { generateTrainingPlan };