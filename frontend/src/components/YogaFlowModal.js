import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const YogaFlowModal = ({ open, handleClose, yogaFlow }) => {
  if (!yogaFlow) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          mx: 'auto',
          my: '20%',
          boxShadow: '0 4px 8px 0 rgba(255, 105, 180, 0.2), 0 6px 20px 0 rgba(255, 105, 180, 0.19)',
          borderRadius: '8px'
        }}
      >
        <Typography variant="h6" component="h2">
          {yogaFlow.name}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Duration: {yogaFlow.duration}
        </Typography>
        <List>
          {yogaFlow.poses.map((pose, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${pose}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default YogaFlowModal;