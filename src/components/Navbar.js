import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@mui/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

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
      <BottomNavigationAction component={Link} to="/dashboard" label="Dashboard" value="Dashboard"icon={<RestaurantIcon />} />
      <BottomNavigationAction component={Link} to="/patients" label="Patients" value="Patients" icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/providers" label="Providers" value="Providers" icon={<PersonIcon />} />
    </BottomNavigation>
   

  );
}

export default Navbar