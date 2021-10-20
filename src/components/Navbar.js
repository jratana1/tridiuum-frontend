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
      <BottomNavigationAction component={Link} to="/patients" label="Patients" value="Patient" icon={<PersonIcon />} />
      <BottomNavigationAction component={Link} to="/providers" label="Providers" value="Provider" icon={<HealthAndSafetyIcon />} />
    </BottomNavigation>
   

  );
}

export default Navbar

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// export default function NavBar(props) {
//   const [value, setValue] = React.useState(0);

//   return (

//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
//         <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
//         <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
//       </BottomNavigation>

//   );
// }