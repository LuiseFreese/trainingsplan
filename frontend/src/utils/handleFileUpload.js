import { validateTrainingPlan } from './validateTrainingPlan';

export const handleFileUpload = (event, setFileName, setPlan) => {
  const file = event.target.files[0];
  setFileName(file.name);
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;
    console.log('File content:', content);
    try {
      const json = JSON.parse(content);
      console.log('Parsed JSON:', json);
      if (validateTrainingPlan(json)) {
        setPlan(json);
        console.log('Training plan set successfully');
      } else {
        console.error('Invalid training plan structure');
      }
    } catch (error) {
      console.error('Invalid JSON file:', error);
    }
  };
  reader.readAsText(file);
};