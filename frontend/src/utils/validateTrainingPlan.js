export const validateTrainingPlan = (plan) => {
    const phases = ['BASE', 'BUILD', 'PEAK', 'TAPER', 'RACE_WEEK'];
    const isValid = phases.every(phase => {
      if (!plan[phase]) {
        console.error(`Missing phase: ${phase}`);
        return false;
      }
      if (!Array.isArray(plan[phase]) || plan[phase].length === 0) {
        console.error(`Invalid or empty phase array: ${phase}`);
        return false;
      }
      return true;
    });
  
    if (!isValid) {
      console.error('Validation failed for training plan:', plan);
    }
  
    return isValid;
  };