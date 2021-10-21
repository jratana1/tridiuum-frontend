import React, { useState, useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import ChipSelect from '../components/ChipSelect'
import Confirm from '../components/Confirm'

import { BASE_URL } from '../App'


const useStyles = makeStyles((theme) => ({
showContainer:{
  width: '100%',
  height: 'calc(100% - 56px - 44px)',
  overflow: 'hidden',
  display: 'block',
  position: 'relative'
}
}));


function Provider() {
    const { id } = useParams();
    const classes = useStyles();
    const [provider, setProvider]= useState(null);
    const [associations, setAssociations]= useState(null)
    const [open, setOpen]= useState(false)

    useEffect(()=> {
            let config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }

            fetch(BASE_URL+"patient/"+id, config)
            .then(res => res.json())
            .then(res => {
            console.log(res)
            })
    }, [id])
    
    if (restaurant) {
        return (
          <div className={classes.showContainer}>
                    <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <TextField
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            value={record.last_name}
                            onChange={handleChange}
                        />
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            value={record.first_name}
                            onChange={handleChange}

                        />
                        <ChipSelect page="Provider" setAssociations={setAssociations} associations={associations} dropDown={hospitals}></ChipSelect>

                  </CardContent>
                  <CardActions>
                      <Button onClick= {() => editRecord(rowData.id, action)}>Save</Button>
                      <Button onClick = {(e) => setOpen({ open: true, action: "Delete", rowData: provider})}>Delete</Button>
                  </CardActions>
                  </Card>
                <Confirm/>
          </div>
          );
        }
          else {return null}
  }

  export default Provider