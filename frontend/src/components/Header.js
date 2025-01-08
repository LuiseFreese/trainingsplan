import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../App.css';

const Header = ({ handleFileUpload, handleExportClick, plan, fileName, handleDeleteFile, handleDownloadTemplate, handleOpenInstructions }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
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
        <ButtonGroup variant="outlined" className="upload-button">
          <label htmlFor="upload-file">
            <Button variant="outlined" component="span">
              Upload Plan
            </Button>
          </label>
          <Button
            variant="outlined"
            onClick={handleMenuClick}
            endIcon={<ArrowDropDownIcon />}
          />
        </ButtonGroup>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleDownloadTemplate}>Download JSON Template</MenuItem>
          <MenuItem onClick={handleOpenInstructions}>Instructions to Fill Your Template</MenuItem>
        </Menu>
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
};

export default Header;