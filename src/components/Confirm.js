import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { blue } from '@mui/material/colors';

import { BASE_URL } from '../App'


const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function Confirm(props) {
  const { onClose, open, action, rowData, setRows } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);

  };

  const deletePatient = (id) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }

      fetch(BASE_URL+`patients/${id}`, config)
      .then(res => res.json())
      .then(res => {
          setRows(res)
          handleClose()
      })
    }


  if (action === "Delete"){
      return (
        <Dialog onClose={handleClose} open={open}>     
            <DialogTitle>Confirm Delete</DialogTitle>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        {rowData.last_name}, {rowData. first_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {rowData.mrn}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick= {() => deletePatient(rowData.id)}>Delete</Button>
                        <Button onClick= {() => handleClose()}>Cancel</Button>                    </CardActions>
                    </Card>
        </Dialog>
      )
  }
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

Confirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};