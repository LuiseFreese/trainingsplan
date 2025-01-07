import { phaseMapping } from './phaseMapping';
import yogaFlows from '../data/yogaFlows.json';
import trainingAdvice from '../data/trainingAdvice.json';

export const handleCardClick = (day, phase, targetTime, setSelectedYogaFlow, setModalOpen, setLongRunAdvice, setGeneralTip, setLongRunModalOpen, isGeneratedPlan) => {
  if (!isGeneratedPlan) {
    return; // Do nothing if the plan is uploaded
  }

  if (day.title === 'Yoga') {
    const randomFlow = yogaFlows.yoga_flows[Math.floor(Math.random() * yogaFlows.yoga_flows.length)];
    setSelectedYogaFlow(randomFlow);
    setModalOpen(true);
  } else if (day.title === 'Long Run') {
    const mappedPhase = phaseMapping[phase];
    const adviceData = trainingAdvice.trainingAdvice[targetTime];
    if (adviceData && adviceData[mappedPhase]) {
      const advice = adviceData[mappedPhase].advice;
      const randomTip = trainingAdvice.generalTips[Math.floor(Math.random() * trainingAdvice.generalTips.length)];
      setLongRunAdvice(advice);
      setGeneralTip(randomTip);
      setLongRunModalOpen(true);
    } else {
      console.error('Invalid target time or phase:', targetTime, phase);
    }
  }
};