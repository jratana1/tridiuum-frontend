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

import ChipSelect from './ChipSelect'

import { useLocation, useHistory } from 'react-router-dom';


import { BASE_URL } from '../App'

export default function Confirm(props) {
  const { onClose, open, action, rowData, setRows, page, dropDown } = props;
  const [ record, setRecord ] = useState({})
  let history = useHistory();
  const location = useLocation()


  const [associations, setAssociations] = useState([])

  function lowerCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  const handleClose = () => {
    onClose();
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
      setRecord({...record, [name]:value })
  };


  const deleteRecord = (id) => {
    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    }

      fetch(BASE_URL+`${lowerCase(page)}s/${id}`, config)
      .then(res => res.json())
      .then(res => {
          setRows(res[lowerCase(page)+"s"])
          handleClose()
          if (location.pathname.split("/")[1] === "providers" && location.pathname.split("/").length > 2) {
          history.push('/')
          }
      })
    }

    const editRecord = (id, action) => {
        let config
        if (action === "Edit") {
                config = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify( { record: record, associations: associations})  
            }
            fetch(BASE_URL+`${lowerCase(page)}s/${id}`, config)
            .then(res => res.json())
            .then(res => {
              setRows(res[lowerCase(page)+"s"])
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
                body: JSON.stringify( { record: record, associations: associations})  

            }
            fetch(BASE_URL+`${lowerCase(page)}s`, config)
            .then(res => res.json())
            .then(res => {
              setRows(res[lowerCase(page)+"s"])
              handleClose()
            })
        }
        }


     useEffect(()=> {
        if (rowData) {
          if (rowData.hospitals){
            let indexes = []
            rowData.hospitals.forEach(element => indexes.push(element.id))
            let selected = dropDown.filter(element => indexes.includes(element.id))
            setAssociations(selected)
          }
          else if (rowData.providers){
            let indexes = []
            rowData.providers.forEach(element => indexes.push(element.id))
            let selected = dropDown.filter(element => indexes.includes(element.id))
            setAssociations(selected)
          }
          else {
            setAssociations([])
          }
        setRecord({...rowData})
        }
    }, [rowData, dropDown])


  if (action === "Delete"){
      return (
        <Dialog onClose={handleClose} open={open}>     
            <DialogTitle>Confirm Delete</DialogTitle>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        {rowData.last_name}, {rowData.first_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {rowData.mrn}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick= {() => deleteRecord(rowData.id)}>Delete</Button>
                        <Button onClick= {() => handleClose()}>Cancel</Button>                    </CardActions>
                    </Card>
        </Dialog>
      )
  }
  else if (action === "Edit" || action === "Create"){
    return (
      <Dialog onClose={handleClose} open={open}>     
          <DialogTitle>{action === "Edit" ? "Edit" : "Add"} {page}</DialogTitle>
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
                        {page === "Patient" ? 
                         <TextField
                            id="mrn"
                            name="mrn"
                            label="MRN"
                            value={record.mrn}
                            onChange={handleChange}
                        />
                        : null}
                        <ChipSelect page={page} setAssociations={setAssociations} associations={associations} dropDown={dropDown}></ChipSelect>

                  </CardContent>
                  <CardActions>
                      <Button onClick= {() => editRecord(rowData.id, action)}>Save</Button>
                      <Button onClick= {() => handleClose()}>Cancel</Button>
                  </CardActions>
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