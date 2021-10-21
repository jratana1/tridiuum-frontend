import React, { useState, useEffect } from 'react';
import {
  useParams,
} from "react-router-dom";
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import ChipSelect from '../components/ChipSelect'
import Confirm from '../components/Confirm'

import { useHistory } from 'react-router-dom';


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
    const [associations, setAssociations] = useState([])
    const [open, setOpen]= useState(false)
    const [record, setRecord] = useState(null)
    const [hospitals, setHospitals] = useState([])
    const history = useHistory()

    const handleChange = (event) => {
        let { name, value } = event.target;
          setRecord({...record, [name]:value })
      };

    const handleClose = () => {
        setOpen({...open, open: false});
    };
    
    const editRecord = (id) => {
            let config = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify( { record: record, associations: associations})  
            }

            fetch(BASE_URL+`providers/${id}`, config)
            .then(res => res.json())
            .then(res => {
                setRecord(res.providers[0])
                history.push('/')
            })
        }
        

    useEffect(()=> {
            let config = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }

            fetch(BASE_URL+"providers/"+id, config)
            .then(res => res.json())
            .then(res => {  
            setRecord(res.providers[0])
            })
    }, [id])

    useEffect(()=> {
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }

        fetch(BASE_URL+"hospitals/", config)
        .then(res => res.json())
        .then(res => {  
        setHospitals(res)
        })
}, [])
    
    if (record) {
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
                      <Button onClick= {() => editRecord(record.id)}>Save</Button>
                      <Button onClick = {(e) => setOpen({ open: true, action: "Delete", rowData: record})}>Delete</Button>
                  </CardActions>
                  </Card>
                <Confirm
                        open={open.open}
                        action= {open.action}
                        rowData= {open.rowData}
                        onClose={handleClose}
                        setRows= {setRecord}
                        page={"Provider"}
                        dropDown={hospitals}
                />
          </div>
          );
        }
          else {return null}
  }

  export default Provider