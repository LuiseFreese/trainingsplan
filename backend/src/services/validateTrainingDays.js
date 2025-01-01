const validateTrainingDays = (trainingDays) => {
    if (trainingDays.length < 3) {
      throw new Error("Insufficient training days provided. Please provide at least 3 training days.");
    }
  };
  
  module.exports = validateTrainingDays;