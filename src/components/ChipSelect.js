import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import CancelIcon from '@mui/icons-material/Cancel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(dropDown, associations, theme) {
  return {
    fontWeight:
      associations.indexOf(dropDown) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChipSelect(props) {
  const theme = useTheme();
  const { dropDown, associations, setAssociations, page }= props

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAssociations(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    setAssociations((current) => current.filter((element) => element.id !== value.id))
  };
  if (page === "Patient") {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Providers</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={associations}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Providers" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={`${value.last_name}, ${value.first_name}`}
                    clickable
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                    />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {dropDown.map((data) => (

            <MenuItem
              key={data.id}
              value={data}
              style={getStyles(dropDown, associations, theme)}
            >
              {data.last_name}, {data.first_name}
            </MenuItem>
      
          ))}
        </Select>
      </FormControl>
    </div>
  )}
  else {
    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Hospitals</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={associations}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Hospitals" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value.name} label={value.name} 
                      clickable
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      onDelete={(e) => handleDelete(e, value)}
                      />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {dropDown.map((data) => (
              <MenuItem
                key={data.name}
                value={data}
                style={getStyles(dropDown, associations, theme)}
              >
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}