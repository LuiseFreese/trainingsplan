import React from 'react';
import { Grid, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { icons } from '../icons';

const TrainingPlan = ({ plan, handleCardClick }) => (
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
              boxShadow: '0 4px 8px 0 rgba(255, 105, 180, 0.2), 0 6px 20px 0 rgba(255, 105, 180, 0.19)'
            }}
          >
            <CardHeader title={`Week ${week.weekNumber} - ${week.weekKM} km`} />
            <CardContent>
              <Grid container spacing={2}>
                {week.days.map((day) => (
                  <Grid item xs={12} sm={6} md={4} key={day.day}>
                    <Card className="day-card" onClick={() => handleCardClick(day, phase)}>
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
);

export default TrainingPlan;