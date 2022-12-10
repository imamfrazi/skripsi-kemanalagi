import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E3E6E5',
    color: '#474A57',
    fontWeight: 700,
    fontSize: '16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function DetailCrackTable({imageMap}) {
  const [rows, setRows] =  React.useState([])
  React.useEffect(()=>{
    if(imageMap.aiCrackDimensions){
      setRows(imageMap.aiCrackDimensions.dimensions)
    }
  },[imageMap])
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="center">Width</StyledTableCell>
              <StyledTableCell align="center">Height</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value} cm
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
              {rows.map((row,index)=>(
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index+1}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.width}</StyledTableCell>
                  <StyledTableCell align="center">{row.height}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
