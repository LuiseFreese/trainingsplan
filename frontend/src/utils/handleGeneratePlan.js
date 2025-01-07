export const handleGeneratePlan = async (targetTime, fitnessLevel, trainingDays, setPlan) => {
  try {
    const response = await fetch(`http://localhost:3000/api/generate-training-plan?targetTime=${targetTime}&fitnessLevel=${fitnessLevel}&trainingDays=${trainingDays.join(',')}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setPlan(data);
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
};