import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, TextField, Button, MenuItem, Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';
import RepeatIcon from '@mui/icons-material/Repeat';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import WeekendIcon from '@mui/icons-material/Weekend';

const fitnessLevels = ['beginner', 'intermediate', 'advanced'];
const targetTimes = ['4:00', '4:30', '5:00'];
const daysOfWeek = [
  { label: 'Monday', value: 0 },
  { label: 'Tuesday', value: 1 },
  { label: 'Wednesday', value: 2 },
  { label: 'Thursday', value: 3 },
  { label: 'Friday', value: 4 },
  { label: 'Saturday', value: 5 },
  { label: 'Sunday', value: 6 },
];

const icons = {
  'Rest Day': <WeekendIcon />,
  'Long Run': <DirectionsRunIcon />,
  Intervals: <RepeatIcon />,
  'Tempo Run': <DirectionsRunIcon />,
  Yoga: <SelfImprovementIcon />,
  'Easy Run': <DirectionsWalkIcon />,
};

function App() {
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [targetTime, setTargetTime] = useState('5:00');
  const [trainingDays, setTrainingDays] = useState([2, 4, 5, 7]);
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState(null);

  const handleGeneratePlan = async () => {
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
                SelectProps={{
                  multiple: true,
                }}
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
              <Button variant="contained" color="primary" onClick={handleGeneratePlan}>
                Generate Plan
              </Button>
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
                    <Card key={week.weekNumber} style={{ marginBottom: '20px', boxShadow: '0 4px 8px 0 rgba(255, 105, 180, 0.2), 0 6px 20px 0 rgba(255, 105, 180, 0.19)' }}>
                      <CardHeader title={`Week ${week.weekNumber} - ${week.weekKM} km`} />
                      <CardContent>
                        <Grid container spacing={2}>
                          {week.days.map((day) => (
                            <Grid item xs={12} sm={6} md={4} key={day.day}>
                              <Card style={{ height: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                  <Typography variant="h6">
                                    {day.label}
                                  </Typography>
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
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;