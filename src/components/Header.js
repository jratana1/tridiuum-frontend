import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useLocation, useHistory } from 'react-router-dom';


export default function Header(props) {
    const { setPage, page } = props;
    const location = useLocation()
    let history = useHistory();


    useEffect(() => {
        let path = location.pathname.split("/")[1]
        let value
        switch(path) {
          case "providers":
            value = "Provider"
            break;
          case "patients":
            value = "Patient"
            break;
          default:
            value = "Dashboard"
        }
        setPage(value)
          },[location.pathname, setPage])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {page === "Dashboard" ? "Dashboard" : page + "s"}
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.goForward()}>
            <ArrowForwardIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}