import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import { BASE_URL } from '../App'

export default function Confirm(props) {
  const { onClose, open, action, rowData, setRows, page } = props;
  const [ patient, setPatient ] = useState({id: "", 
                                            first_name: "",
                                            mrn: "",
                                            last_name: ""})

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
      setPatient({...patient, [name]:value })
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

    const editPatient = (id, action) => {
        let config
        if (action === "Edit") {
                config = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify( patient )  
            }
            fetch(BASE_URL+`patients/${id}`, config)
            .then(res => res.json())
            .then(res => {
              setRows(res)
              handleClose()
            })
        }
        else {
            config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify( patient )  
            }
            fetch(BASE_URL+`patients`, config)
            .then(res => res.json())
            .then(res => {
              setRows(res)
              handleClose()
            })
        }
        }


     useEffect(()=> {
        if (rowData) {
        setPatient({...rowData})
        }
    }, [rowData])


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
  else if (action === "Edit" || action === "Create"){

    return (
      <Dialog onClose={handleClose} open={open}>     
          <DialogTitle>Edit Patient</DialogTitle>
              <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                  <TextField
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            value={patient.last_name}
                            onChange={handleChange}
                        />
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            value={patient.first_name}
                            onChange={handleChange}

                        />
                         <TextField
                            id="mrn"
                            name="mrn"
                            label="MRN"
                            value={patient.mrn}
                            onChange={handleChange}
                        />
                  </CardContent>
                  <CardActions>
                      <Button onClick= {() => editPatient(rowData.id, action)}>Save</Button>
                      <Button onClick= {() => handleClose()}>Cancel</Button>                    </CardActions>
                  </Card>
      </Dialog>
    )  
    }
    else {
        return null
    }
}

Confirm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};