import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

const InstructionsModal = ({ open, handleClose }) => (
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
      <Typography variant="h6" gutterBottom>
        Instructions to Fill Your Template
      </Typography>
      <Typography variant="body1" gutterBottom>
        1. Open the downloaded JSON template.
      </Typography>
      <Typography variant="body1" gutterBottom>
        2. Fill in the details for each day, including the title, description, options, and distance.
      </Typography>
      <Typography variant="body1" gutterBottom>
        3. Save the file and upload it using the "Upload Plan" button.
      </Typography>
    </Box>
  </Modal>
);

export default InstructionsModal;