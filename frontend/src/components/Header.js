import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Header = ({ handleFileUpload, handleExportClick, plan, fileName, handleDeleteFile }) => (
  <AppBar position="static" style={{ background: 'none', boxShadow: 'none' }}>
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Marathon Training Plan
      </Typography>
      <input
        accept=".json"
        style={{ display: 'none' }}
        id="upload-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-file">
        <Button variant="outlined" style={{ borderColor: '#ff69b4', color: '#ff69b4', marginRight: '10px' }} component="span">
          Upload Plan
        </Button>
      </label>
      {fileName && (
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
          <Typography variant="body1" style={{ marginRight: '10px' }}>
            {fileName}
          </Typography>
          <IconButton style={{ color: '#ff69b4' }} onClick={handleDeleteFile}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <Button variant="outlined" style={{ borderColor: '#ff69b4', color: '#ff69b4' }} onClick={handleExportClick} disabled={!plan}>
        Export to Calendar
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;