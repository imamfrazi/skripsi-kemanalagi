import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

//Icon
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

//Component 
import LiveImageCheckDialog from '../components/LiveImageCheckDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import AddOperatorDialog from './AddOperatorDialog'

//search
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

//Api
import { operatorListApi, deleteUserApi } from '../Api/user'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #EEEFF4 !important',
  textAlign: 'start',
  borderRadius: '8px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100% !important',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


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
const customPagination = () => ({
  '& .Mui-selected': {
    backgroundColor: '#FF0202 !important',
    color: 'white',
  }
})
const DataSummaryIcon = styled('div')(props => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#247BA0',
}))
function OperatorTable({ refresh, callbackBtnAllDelete }) {
  const [rows, setRows] = React.useState([])
  const [operatorList, setOperatorList] = React.useState(rows)
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [operatorIdDelete, setOperatorIdDelete] = React.useState([])
  //modal
  const [messageDelete, setMessageDelete] = React.useState('')
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false)
  const [statusUpdateModal, setStatusUpdateModal] = React.useState('update')
  const [dataUpdateModal, setDataUpdateModal] = React.useState({})

  // search
  const [operatorSearch, setOperatorSearch] = React.useState('');

  // checkSelected box
  const [selectedAll, setSelectedAll] = React.useState(false)
  const [operatorDeleted, setOperatorDeleted] = React.useState([])
  
  const handleClosedDeleteModal =()=> {
      setOpenDeleteModal(false)
      setOperatorIdDelete([])
  }
  const handleCallbackConfirmation= async()=>{
    await removeSingleOperator()
  }

  const handleClosedUpdateModal = ()=>{
    setOpenUpdateModal(false)
  }

  const handleUpdateOperator = async (item) => {
    setDataUpdateModal(item)
    setOpenUpdateModal(true)
  }

  const toggleCheckbox = (event) => {
    if (event.target.checked) {
      // setTrashStateBin([...trashState, event.target.value])
        setOperatorDeleted([...operatorDeleted, event.target.value])
      } else {
        // setTrashStateBin(currentValue => currentValue.filter((x) => x !== event.target.value))
        setOperatorDeleted(currentValue => currentValue.filter((x) => x !== event.target.value))
    }
  }
  const toggleCheckboxAll = (event) => {
    let checkboxes = document.getElementsByName('check_list')
    if (event.target.checked) {
      let statePush = []
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true
        statePush[i] = checkboxes[i].value
      }
      setSelectedAll(true)
      setOperatorDeleted(statePush)
      // setTrashStateBin(statePush)
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false
        setOperatorDeleted([])
        // setTrashStateBin([])
      }
    }
  }
  const handleChangePage = (event, newPage) => {
    if (count >= 1) {
      setPage(newPage - 1);
      setCount(newPage)
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleDeleteSingleOperator = (operatorId) => {
    setOperatorIdDelete(operatorId)
    setMessageDelete(`Are you sure you want to  delete this operator(s)?`)
    setOpenDeleteModal(true)
  }
  //Method hit endpoint
  const removeSingleOperator = async() =>{
    try{
      let id = []
      id.push(operatorIdDelete)
      let body = {id}
      let response = await deleteUserApi(body)
      await receiveOperatorList()
      setOperatorIdDelete([])
      setOpenDeleteModal(false)
    }catch(error){
      console.log(error)
    }
  }
  const receiveOperatorList = async() => {
    try{
      let response = await operatorListApi()
      setRows(response.data)
      setOperatorList(response.data)
      setOpenUpdateModal(false)
    }catch(error){
      console.log(error)
    }
  }
  ///////////////////////////////////////////
  React.useEffect(()=>{
    if(operatorDeleted.length >= 2){
      callbackBtnAllDelete({status:true, operatorDelete: operatorDeleted})
    }else{
      callbackBtnAllDelete({status: false, operatorDelete: []})
    }
  }, [operatorDeleted])

  React.useEffect(()=>{
    if(operatorSearch != ''){
      let result = rows.filter(operator => operator.fullName.toLowerCase().indexOf(operatorSearch.toLocaleLowerCase()) > -1)
      setOperatorList(result)
    }else{
      setOperatorList(rows)
    }
  },[operatorSearch])

  React.useEffect(() => {
      receiveOperatorList()
  }, [])
  React.useEffect(() => {
    if(refresh != 0){
      receiveOperatorList()
    }
  }, [refresh])

  return (
    <>
      <Search className="mt-1 mb-2">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Operator"
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => setOperatorSearch(e.target.value)}
        />
      </Search>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <input type="checkbox" onChange={toggleCheckboxAll} />
              </StyledTableCell>
              <StyledTableCell>Operator Name</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operatorList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                >
                  <input
                    type="checkbox"
                    name="check_list"
                    onChange={toggleCheckbox}
                    value={row.id}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.fullName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <DataSummaryIcon >
                    <div className="icon mr-1">
                        <EditOutlined onClick={()=>handleUpdateOperator(row)}/>
                    </div>
                    <div className="icon mr-1">
                        <DeleteOutlined onClick={()=>handleDeleteSingleOperator(row.id)}/>
                    </div>
                  </DataSummaryIcon>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-4 d-flex justify-content-between" sx={customPagination}>
        <Pagination count={operatorList.length / rowsPerPage <= 0 ? 1 : Math.ceil(operatorList.length / rowsPerPage)} page={count} onChange={handleChangePage} variant="outlined" shape="rounded" />
        <div>
          <label className='mr-1'>show:</label>
          <select name="cars" id="cars" onChange={handleChangeRowsPerPage} style={{ borderRadius: '4px', height: '24px', padding: '4px 4px' }}>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="40">40 rows</option>
          </select>
        </div>
      </Box>
      <DeleteConfirmationDialog open={openDeleteModal} messageDelete={messageDelete} closedModal={handleClosedDeleteModal} callbackConfirmation={handleCallbackConfirmation}/>
      <AddOperatorDialog open={openUpdateModal} statusModal={statusUpdateModal} dataModal={dataUpdateModal} closedModal={handleClosedUpdateModal} updateOperator={receiveOperatorList} />
    </>
  );
}

export default OperatorTable;