import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const LongRunModal = ({ open, handleClose, advice, generalTip }) => {
  if (!advice) return null;

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
          Long Run Advice
        </Typography>
        <List>
          {advice.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${tip}`} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText primary={`• Tip: ${generalTip}`} />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default LongRunModal;