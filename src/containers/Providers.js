import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import Confirm from '../components/Confirm'

import { BASE_URL } from '../App'


const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important',
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});


class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };



  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, rowData, columnIndex }) => {

    const { columns, classes, rowHeight, onRowClick } = this.props;
    if (columnIndex === columns.length-1) {
        return (
            <Box>
                <Button onClick = {(e) => this.props.setOpen({ open: true, action: "Edit", rowData: rowData})}>
                    Edit
                </Button>
                <Button onClick = {(e) => this.props.setOpen({ open: true, action: "Delete", rowData: rowData})}>
                    Delete
                </Button>
            </Box>
        )
    }
    else {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    );
    }
  };

  headerRenderer = ({ label }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string,
      label: PropTypes.string,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

export default function ReactVirtualizedTable() {
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState({open: false, action: ""})
    
      const handleClose = () => {
        setOpen({...open, open: false});
      };


    useEffect(()=> {
        let config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }
    
          fetch(BASE_URL+"providers", config)
          .then(res => res.json())
          .then(res => {
                console.log(res)
                setRows(res)
          })
      }, [])

  return (
    <Box>
    <Paper style={{ height: 400, width: '100%' }}>
      <VirtualizedTable
        setRows= {setRows}
        setOpen= {setOpen}
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 100,
            label: 'ID',
            dataKey: 'id',
          },
          {
            width: 200,
            label: 'Last Name',
            dataKey: 'last_name',
          },
          {
            width: 200,
            label: 'First Name',
            dataKey: 'first_name',
          },
          {
            width: 200,
            label: '# Patients',
            dataKey: 'patients',
          },
          {
            dataKey: 'action',
            label: 'Actions',
            width: 140,

          },
        ]}
      />
    </Paper>
    <Button onClick={() => {setOpen({open: true,
                                    action: "Create",
                                    rowData: {id: "", 
                                            first_name:"",
                                            mrn: "",
                                            last_name: ""}
                                    })}}
        >
        Add Provider
    </Button>
    <Confirm
        open={open.open}
        action= {open.action}
        rowData= {open.rowData}
        onClose={handleClose}
        setRows= {setRows}
    />
    </Box>
  );
}