import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//API
import { productInspectionApi } from '../Api/product'


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


export default function CheckHistoryTable({ productId }) {
  const [rows, setRows] = React.useState([])
  // Method for call api
  const receiveProductInspection = async (productId) => {
    try {
      let response = await productInspectionApi(productId)
      let { data } = response
      setRows(data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(()=>{
    if(productId){
      receiveProductInspection(productId)
    }else{
      setRows([])
    }
  }, [productId])
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 460 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Time Created</StyledTableCell>
              <StyledTableCell align="center">ID Product Inspection</StyledTableCell>
              <StyledTableCell align="center">Operator Name</StyledTableCell>
              <StyledTableCell align="center">No.Shot</StyledTableCell>
              <StyledTableCell align="center">Model Name</StyledTableCell>
              <StyledTableCell align="center">AI Judgement</StyledTableCell>
              {/* <StyledTableCell align="center">AI Confidence</StyledTableCell> */}
              <StyledTableCell align="center">Operator Judgement</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.createdAt?new Date(row.createdAt).toLocaleString('en-IN'):'-'}
                </StyledTableCell>
                <StyledTableCell align="center">{row.productInspectionId}</StyledTableCell>
                <StyledTableCell align="center">{row.product.user.firstName} {row.product.user.lastName}</StyledTableCell>
                <StyledTableCell align="center">{row.product.qrCode}</StyledTableCell>
                <StyledTableCell align="center">{row.product.noShot}</StyledTableCell>
                <StyledTableCell align="center">{row.aiStatus ? row.aiStatus:'-'}</StyledTableCell>
                {/* <StyledTableCell align="center">{row.aiConfidence ? row.aiConfidence:'-'}</StyledTableCell> */}
                <StyledTableCell align="center">{row.userStatus ? row.userStatus:'-'}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
