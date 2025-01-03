import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, MenuItem, Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';
import YogaFlowModal from './YogaFlowModal'; // Import the YogaFlowModal component
import LongRunModal from './LongRunModal'; // Import the LongRunModal component
import yogaFlows from './yogaFlows.json'; // Assuming yogaFlows.json is in the same directory
import trainingAdvice from './trainingAdvice.json'; // Import the training advice JSON
import { fitnessLevels, targetTimes, daysOfWeek } from './constants'; // Import constants
import { icons } from './icons'; // Import icons
import { phaseMapping } from './phaseMapping'; // Import phase mapping
import { handleGeneratePlan } from './handleGeneratePlan'; // Import handleGeneratePlan function
import './App.css'; // Import the CSS file
import { exportICS } from './exportICS'; // Import the exportICS function

function App() {
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [targetTime, setTargetTime] = useState('5:00');
  const [trainingDays, setTrainingDays] = useState([2, 4, 5, 7]);
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYogaFlow, setSelectedYogaFlow] = useState(null);
  const [longRunModalOpen, setLongRunModalOpen] = useState(false);
  const [longRunAdvice, setLongRunAdvice] = useState(null);
  const [generalTip, setGeneralTip] = useState('');

  const handleCardClick = (day, phase) => {
    if (day.title === 'Yoga') {
      const randomFlow = yogaFlows.yoga_flows[Math.floor(Math.random() * yogaFlows.yoga_flows.length)];
      setSelectedYogaFlow(randomFlow);
      setModalOpen(true);
    } else if (day.title === 'Long Run') {
      console.log(`Target Time: ${targetTime}, Phase: ${phase}`);
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

  const handleCloseYogaModal = () => {
    setModalOpen(false);
    setSelectedYogaFlow(null);
  };

  const handleCloseLongRunModal = () => {
    setLongRunModalOpen(false);
    setLongRunAdvice(null);
    setGeneralTip('');
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Marathon Training Plan Generator
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Fitness Level"
                value={fitnessLevel}
                onChange={(e) => setFitnessLevel(e.target.value)}
                fullWidth
                margin="normal"
              >
                {fitnessLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Target Time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                fullWidth
                margin="normal"
              >
                {targetTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Training Days"
                value={trainingDays}
                onChange={(e) => setTrainingDays(e.target.value)}
                fullWidth
                margin="normal"
                SelectProps={{ multiple: true }}
              >
                {daysOfWeek.map((day) => (
                  <MenuItem key={day.value} value={day.value}>
                    {day.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => handleGeneratePlan(targetTime, fitnessLevel, trainingDays, setPlan)} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    Generate Plan
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="secondary" onClick={() => exportICS(startDate, fitnessLevel, targetTime)} style={{ marginLeft: '20px', borderColor: '#ff69b4', color: '#ff69b4', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    Export to Calendar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {plan && (
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
              {Object.keys(plan).map((phase) => (
                <Grid item xs={12} key={phase}>
                  <Typography variant="h5" gutterBottom>
                    {phase}
                  </Typography>
                  {plan[phase].map((week) => (
                    <Card
                      key={week.weekNumber}
                      style={{
                        marginBottom: '20px',
                        boxShadow:
                          '0 4px 8px 0 rgba(255, 105, 180, 0.2), 0 6px 20px 0 rgba(255, 105, 180, 0.19)'
                      }}
                    >
                      <CardHeader title={`Week ${week.weekNumber} - ${week.weekKM} km`} />
                      <CardContent>
                        <Grid container spacing={2}>
                          {week.days.map((day) => (
                            <Grid item xs={12} sm={6} md={4} key={day.day}>
                              <Card
                                className="day-card"
                                onClick={() => handleCardClick(day, phase)}
                              >
                                <CardContent>
                                  <Typography variant="h6">{day.label}</Typography>
                                  <Typography variant="body1">
                                    {icons[day.title] || icons['Easy Run']} {day.title}
                                  </Typography>
                                  <Typography variant="body2">
                                    {day.description.replace(/\.$/, '')}
                                  </Typography>
                                  {day.options.map((option, index) => (
                                    <Typography variant="caption" display="block" key={index}>
                                      {option}
                                    </Typography>
                                  ))}
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              ))}
            </Grid>
          )}

          <YogaFlowModal open={modalOpen} handleClose={handleCloseYogaModal} yogaFlow={selectedYogaFlow} />
          <LongRunModal open={longRunModalOpen} handleClose={handleCloseLongRunModal} advice={longRunAdvice} generalTip={generalTip} />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;