import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';

const Header = ({ handleFileUpload, handleExportClick, plan, fileName, handleDeleteFile }) => (
  <AppBar position="static" className="app-bar">
    <Toolbar>
      <Typography variant="h6" className="toolbar-title">
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
        <Button variant="outlined" className="upload-button" component="span">
          Upload Plan
        </Button>
      </label>
      {fileName && (
        <div className="file-info">
          <Typography variant="body1" className="file-name">
            {fileName}
          </Typography>
          <IconButton className="delete-icon" onClick={handleDeleteFile}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {!fileName && <div style={{ marginRight: '10px' }}></div>} {/* Add margin when no file is uploaded */}
      <Button variant="outlined" className="export-button" onClick={handleExportClick} disabled={!plan}>
        Export to Calendar
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;