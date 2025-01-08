import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Button, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';
import YogaFlowModal from './components/YogaFlowModal';
import LongRunModal from './components/LongRunModal';
import InstructionsModal from './components/InstructionsModal';
import { handleGeneratePlan } from './utils/handleGeneratePlan';
import Header from './components/Header';
import TrainingPlanForm from './components/TrainingPlanForm';
import TrainingPlan from './components/TrainingPlan';
import './App.css';
import { exportICS } from './utils/exportICS';
import { handleFileUpload } from './utils/handleFileUpload';
import { handleCardClick } from './utils/handleCardClick';

function App() {
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [targetTime, setTargetTime] = useState('5:00');
  const [trainingDays, setTrainingDays] = useState([2, 4, 5, 7]);
  const [startDate, setStartDate] = useState(new Date());
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [uploadedPlan, setUploadedPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [selectedYogaFlow, setSelectedYogaFlow] = useState(null);
  const [longRunModalOpen, setLongRunModalOpen] = useState(false);
  const [longRunAdvice, setLongRunAdvice] = useState(null);
  const [generalTip, setGeneralTip] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileUploadWrapper = (event) => handleFileUpload(event, setFileName, setUploadedPlan);

  const handleDeleteFile = () => {
    setFileName('');
    setUploadedPlan(null);
  };

  const handleCardClickWrapper = (day, phase) => handleCardClick(day, phase, targetTime, setSelectedYogaFlow, setModalOpen, setLongRunAdvice, setGeneralTip, setLongRunModalOpen, !!generatedPlan);

  const handleCloseYogaModal = () => {
    setModalOpen(false);
    setSelectedYogaFlow(null);
  };

  const handleCloseLongRunModal = () => {
    setLongRunModalOpen(false);
    setLongRunAdvice(null);
    setGeneralTip('');
  };

  const handleExportClick = () => {
    const activePlan = uploadedPlan || generatedPlan;
    if (activePlan) {
      console.log('Exporting plan to ICS:', activePlan);
      exportICS(startDate, fitnessLevel, targetTime, activePlan);
    }
  };

  const handleGeneratePlanClick = () => {
    handleGeneratePlan(targetTime, fitnessLevel, trainingDays, setGeneratedPlan);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/template.json`;
    link.download = 'template.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInstructions = () => {
    setInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setInstructionsOpen(false);
  };

  const activePlan = uploadedPlan || generatedPlan;
  const isGeneratedPlan = !!generatedPlan;

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <Header
            handleFileUpload={handleFileUploadWrapper}
            handleExportClick={handleExportClick}
            plan={activePlan}
            fileName={fileName}
            handleDeleteFile={handleDeleteFile}
            handleDownloadTemplate={handleDownloadTemplate}
            handleOpenInstructions={handleOpenInstructions}
          />
          <div className="date-picker-container">
            <TrainingPlanForm
              fitnessLevel={fitnessLevel}
              setFitnessLevel={setFitnessLevel}
              targetTime={targetTime}
              setTargetTime={setTargetTime}
              trainingDays={trainingDays}
              setTrainingDays={setTrainingDays}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          </div>
          <Grid item xs={12} className="grid-item">
            <Button
              variant="contained"
              color="primary"
              onClick={handleGeneratePlanClick}
              className="generate-button"
              disabled={!!uploadedPlan} // Disable if there is an uploaded plan
            >
              Generate Plan
            </Button>
          </Grid>
          {activePlan && <TrainingPlan plan={activePlan} handleCardClick={handleCardClickWrapper} />}
          <YogaFlowModal open={modalOpen} handleClose={handleCloseYogaModal} yogaFlow={selectedYogaFlow} disabled={!isGeneratedPlan} />
          <LongRunModal open={longRunModalOpen} handleClose={handleCloseLongRunModal} advice={longRunAdvice} generalTip={generalTip} disabled={!isGeneratedPlan} />
          <InstructionsModal open={instructionsOpen} handleClose={handleCloseInstructions} />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;