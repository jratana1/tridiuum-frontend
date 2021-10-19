import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

function Navbar(props) {
  const useStyles = makeStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
  });
  const classes = useStyles();
  return (
    <BottomNavigation
      value={props.value}
      onChange={(event, newValue) => {
        props.setValue(newValue);
      }}
      showLabels
      className={classes.stickToBottom}
      
    >
      <BottomNavigationAction component={Link} to="/dashboard" label="Dashboard" value="Dashboard"icon={<DashboardIcon />} />
      <BottomNavigationAction component={Link} to="/patients" label="Patients" value="Patients" icon={<PersonIcon />} />
      <BottomNavigationAction component={Link} to="/providers" label="Providers" value="Providers" icon={<HealthAndSafetyIcon />} />
    </BottomNavigation>
   

  );
}

export default Navbar