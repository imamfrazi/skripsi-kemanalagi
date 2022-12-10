import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

//Component 
import LiveImageCheckDialog from '../components/LiveImageCheckDialog';
import HistoryJudgmentDialog from '../components/HistoryJudgmentDialog';
import Search from '@mui/icons-material/Search';

//API
import { productHistoryApi, productInspectionApi } from '../Api/product'

//Utils
import { qrCodeParser } from '../utils/codeParser'

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
const customPagination = () =>({
  '& .Mui-selected':{
    backgroundColor: '#FF0202 !important',
    color: 'white',
  }
})
export default function HistoryImageTables({search, operatorId, choosenDate}) {
  const [rows,setRows] = React.useState([])
  const [totalData, setTotalData] = React.useState(0)
  const [imageList,setImageList] = React.useState([])
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openLiveImageModal, setOpenLiveImageModal] = React.useState(false);
  const [openJudgmentModal, setOpenJudgmentModal] = React.useState(false);
  const [operator,setOperator] = React.useState(2)
  const [operatorName, setOperatorName] = React.useState("setyawan")
  const [barcode, setBarcode] = React.useState("517RF234")
  const [productId, setProductId] = React.useState(null)
  const [productDetail, setProductDetail] = React.useState({
    qrCode: '517RF234',
    numberShotMachine: 'numberShotMachine',
    prodDate: '15',
    prodMonth: '01',
    prodYear: '2022'
  })
  const handleChangePage = (event, newPage) => {
    if(count >= 1){
      setPage(newPage-1);
      setCount(newPage);
      receiveProductHistory(rowsPerPage, newPage-1, 'default')
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    receiveProductHistory(event.target.value, page, 'default')
    setPage(0);
  };
  const handleLiveImageModal= (item) =>{
    setProductId(item.id)
    setBarcode(item.qrCode)
    setOperator(item.userId)
    setOpenLiveImageModal(true)
  }
  const handleOpenJudgmentModal = async (row) =>{
    setProductId(row.id)
    setOpenJudgmentModal(true)
  }
  const handleClosedModal = async (item) => {
    setOpenLiveImageModal(false)
    setOpenJudgmentModal(false)
  }
  const parseCode = (item, key) => {
    let resultParse = qrCodeParser(item)
    switch (key) {
      case 'number_shot':
        return resultParse.numberShotMachine
      default:
        return item
    }
  }
  //Method for hit endpoint
  const receiveProductHistory = async(limit, page, status="custom") =>{
    try{
      let response = await productHistoryApi(limit,page)
      await setRows(response.data.data)
      await setImageList(response.data.data)
      if(status == 'default'){
        setTotalData(response.data.total)
      }
    }catch(error){
      console.log(error)
    }
  }
  /////////////////////////

  // React.useEffect(() => {
  //   if (operatorId == '-' && search.length == 0){
  //     receiveProductHistory(rowsPerPage, page, "default")
  //   }
  // }, [])
  // React.useEffect(() => {
  //   if (operatorId != '-' || search.length != 0) {
  //     receiveProductHistory(10000, page)
  //   }else {
  //     console.log("ini masuk sini")
  //     console.log(search.length,"ini search length")
  //     receiveProductHistory(10, 0, "default")
  //     setRowsPerPage(10)
  //   }
  // }, [operatorId, search])

  // React.useEffect(() => {
  //   if (operatorId != '-') {
  //     var result = rows.filter(item => item.userId == operatorId)
  //     setImageList(result)
  //     setTotalData(0)
  //     setRowsPerPage(10000);
  //   }else if (search.length != 0) {
  //     var result = rows.filter(item => item.qrCode.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
  //     setImageList(result)
  //     setTotalData(0)
  //     setRowsPerPage(10000);
  //   }else if (search.length != 0 && operatorId != '-') {
  //     var result = rows.filter(item => item.qrCode.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && item.userId == operatorId)
  //     setImageList(result)
  //     setTotalData(0)
  //     setRowsPerPage(10000);
  //   }
  // },[rows])

  React.useEffect(() => {
    if (choosenDate == '-' && search.length == 0) {
      receiveProductHistory(rowsPerPage, page, "default")
    }
  }, [])
  React.useEffect(() => {
    if (choosenDate != '-' || search.length != 0) {
      receiveProductHistory(10000, page)
    } else {
      receiveProductHistory(10, 0, "default")
      setRowsPerPage(10)
    }
  }, [choosenDate, search])

  React.useEffect(() => {
    if (search.length != 0 && choosenDate != '-') {
      var result = rows.filter(item => {
        if (new Date(item.createdAt).getDate() + (new Date(item.createdAt).getMonth() + 1) + new Date(item.createdAt).getFullYear() == choosenDate.$D + choosenDate.$M + 1 + choosenDate.$y) {
          if (item.qrCode.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1) {
            return item
          }
        }
      })
      console.log("hello")
      setImageList(result)
      setTotalData(0)
      setRowsPerPage(10000);
    } else if (choosenDate != '-') {
      console.log(rows)
      var result = rows.filter(item => 
        // console.log(new Date(item.createdAt).getDate(),'ini date item day')
        // console.log(new Date(item.createdAt).getMonth() + 1,'ini date item month')
        // console.log(new Date(item.createdAt).getYear(),'ini date item year')
        {
        console.log(new Date(item.createdAt).getDate() + (new Date(item.createdAt).getMonth() + 1) + new Date(item.createdAt).getFullYear())
        console.log(choosenDate)
        console.log(choosenDate.$D + (choosenDate.$M + 1) + choosenDate.$y)
          if(new Date(item.createdAt).getDate()+(new Date(item.createdAt).getMonth() + 1)+new Date(item.createdAt).getFullYear() == choosenDate.$D+ choosenDate.$M+1 +choosenDate.$y){
            return item   
          }
        }
      )
      console.log(result,"ini hasil filtering")
      setImageList(result)
      setTotalData(0)
      setRowsPerPage(10000);
    }else if (search.length != 0) {
      var result = rows.filter(item => item.qrCode.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
      setImageList(result)
      setTotalData(0)
      setRowsPerPage(10000);
    } 
  },[rows])
  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.Shot</StyledTableCell>
              <StyledTableCell align="center">Model Name</StyledTableCell>
              <StyledTableCell align="center">Operator Name&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Date Time&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Product Check Result&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Detail Image&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imageList.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.qrCode}
                </StyledTableCell>
                <StyledTableCell align="center" >
                  {row.noShot}
                </StyledTableCell>
                <StyledTableCell align="center">{row.user.firstName}&nbsp;{row.user.lastName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(row.createdAt).toLocaleString('en-IN')}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    onClick={() => handleLiveImageModal(row)}
                  >
                    View Detail
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Link
                    onClick={()=> handleOpenJudgmentModal(row)}
                  >
                    Check History
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-4 d-flex justify-content-between" sx={customPagination}>
        <Pagination count={totalData / rowsPerPage <= 0 ? 1 : Math.ceil(totalData / rowsPerPage) } page={count} onChange={handleChangePage} variant="outlined" shape="rounded" />
        <div>
          <label className='mr-1'>show:</label>
          <select value={rowsPerPage} name="cars" id="cars" onChange={handleChangeRowsPerPage} style={{borderRadius: '4px', height: '24px', padding: '4px 4px'}}>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="40">40 rows</option>
            <option value="10000">All rows</option>
          </select>
        </div>
      </Box>
      <LiveImageCheckDialog open={openLiveImageModal} closedModal={handleClosedModal} operatorId={operator} operatorName={operatorName} barcode={barcode} productDetail={productDetail} productId={productId}/>
      <HistoryJudgmentDialog open={openJudgmentModal} closedModal={handleClosedModal} productId={productId}/>
    </>
  );
}
