import React from 'react';
import { Grid, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { fitnessLevels, targetTimes, daysOfWeek } from '../utils/constants'; // Updated path

const TrainingPlanForm = ({ fitnessLevel, setFitnessLevel, targetTime, setTargetTime, trainingDays, setTrainingDays, startDate, setStartDate }) => (
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
  </Grid>
);

export default TrainingPlanForm;