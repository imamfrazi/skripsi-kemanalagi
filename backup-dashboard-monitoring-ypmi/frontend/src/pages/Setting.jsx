import * as React from 'react';

import { styled  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

//Component 
import OperatorTable from '../components/OperatorTable';
import SwitchAutoDelete from '../components/SwitchAutoDelete';
import StorageLimitProgress from '../components/StorageLimitProgress';
import TimeSetting from '../components/TimeSetting';
import AddOperatorDialog from '../components/AddOperatorDialog'
import SnackbarMessage from '../components/SnackbarMessage';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog'

//Icon
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

//Api
import { operatorListApi, deleteUserApi } from '../Api/user'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  borderRadius: '4px',
  boxShadow: 'none !important',
}));

function Setting() {
  const tableRef = React.useRef(null);
  const location = useLocation();
  const [refresh,setRefresh] = React.useState(0)

  const [addOperatorModal, setOperatorModal] = React.useState(false);
  const [operator, setOperator] = React.useState('-');
  const [operatorName, setOperatorName] = React.useState('-');
  const [message, setMessage] = React.useState('');
  const [operatorOptions, setOperatorOptions] = React.useState([])
  const [operatorDelete, setOperatorDelete] = React.useState([])
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [severity, setSeverity] = React.useState('')
  const [btnAllDelete, setBtnAllDelete] = React.useState(false)

  //modal
  const [messageDelete, setMessageDelete] = React.useState('')
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)

  const handleClosedDeleteModal = () => {
    setOpenDeleteModal(false)
  }
  const handleCallbackConfirmation = async () => {
    await removeBulkOperator(operatorDelete)
  }

  const handleChangeOperatorName = (event) => {
    setOperator(event.target.value);
    let operator = operatorOptions.filter((item) => {
      if (item.id == event.target.value) return item
    })
    setOperatorName(operator[0] ? operator[0].fullName : '-')
    localStorage.setItem('operator', JSON.stringify(operator))
  };
  const handleOpenModal =  async() =>{
    setOperatorModal(true)
  }
  const handleClosedModal = async (item) => {
    setOperatorModal(false)
  }
  const callbackTimeSetting = (item) => {
    setOpenSnackbar(true)
    setMessage(item.message)
    setSeverity(item.severityStatus)
  }
  const handleUpdateOperator = async (item) => {
    try {
      setOperatorModal(false)
      setRefresh(current=>current+1)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCloseSnackbar = ()=>{
    setOpenSnackbar(false)
  }
  const callbackBtnAllDelete = (item)=>{
    setOperatorDelete(item)
    setBtnAllDelete(item.status)
  }
  const handleAllDeleteOperator= async()=>{
    setOpenDeleteModal(true)
    setMessageDelete(`Are you sure you want to  delete selected operator(s)?`)
  }

  const handleAutoDelete = (params) =>{
    setOpenSnackbar(true)
    setMessage(params.message)
    setSeverity(params.severityStatus)
  }
  // Method for hit api
  const removeBulkOperator =  async (item) => {
    try{
      let body = {
        id: item.operatorDelete
      }
      let response = await deleteUserApi(body)
      setRefresh(current => current + 1)
      setOpenDeleteModal(false)
      setBtnAllDelete(false)
    }catch(error){
      console.log(error)
    }
  } 
  const receiveOperatorList = async () => {
    try {
      let response = await operatorListApi()
      setOperatorOptions(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // ////////////////////////////////////////

  React.useEffect(() => {
    localStorage.setItem('barcode', JSON.stringify({ status: "" }))
    if (localStorage.getItem('operator')) {
      let operator = JSON.parse(localStorage.getItem('operator'))
      if (operator.length != 0) {
        setOperator(operator[0].id);
        setOperatorName(operator[0].fullName)
      }
    }
    receiveOperatorList()
  }, []);

  return (
    <>
      <Box className='mt-5'>
        <h3 className='m-0 mt-5 mb-5 font-weight-bolder'>Setting</h3>
      </Box>
      <Box sx={{ flexGrow: 1 }} className="mt-5">
        <Grid container spacing={6}>
          {/* <Grid item xs={8}>
            <Item className='pt-2 pl-3 pr-3 pb-3'>
              <Box className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 text-grey font-weight-bolder">User Management</h5>
                <Box>
                  <Button className="bg-primary font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px' }} onClick={handleOpenModal}>
                    <AddCircleOutlineIcon />
                    <span className='ml-1'>Add Operator</span>
                  </Button>
                  { btnAllDelete ?
                    <Button className="ml-1 text-grey bg-white font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px' }} onClick={handleAllDeleteOperator}>
                      <AddCircleOutlineIcon />
                      <span className='ml-1'>Delete Choosen Operator</span>
                    </Button>
                    : null
                  }
                </Box>
              </Box>
              <OperatorTable refresh={refresh} callbackBtnAllDelete={callbackBtnAllDelete}/>
            </Item>
          </Grid> */}
          <Grid item xs={8}>
            <Item className='pt-2 pl-3 pr-3 pb-3'>
              <TimeSetting handleCallbackTimeSetting={callbackTimeSetting} />
            </Item>
          </Grid>
          <Grid item xs={4} alignItems="center">
            <Grid container>
              <Grid item xs={12}>
                <Item className='pt-2 pl-3 pr-3 pb-3'>
                  <h5 className="m-0 text-grey font-weight-bolder">Storage</h5>
                  <Box className="mb-5 mt-3">
                    <StorageLimitProgress />
                  </Box>
                  <Box className="d-flex justify-content-between border-light align-items-center p-1" sx={{border: '1px solid #D9DBE1', borderRadius: '8px'}}>
                    <h6 className="m-0 text-grey font-weight-bolder">Auto Delete</h6>
                    <SwitchAutoDelete handleAlertAutoDelete={handleAutoDelete}/>
                  </Box>
                  <Box>
                    <p className="m-0 font-weight-semibold" style={{fontSize:'10px !important'}}>*Auto delete saat hasil capture sudah melebihi kapasitas memori perbulan</p>
                  </Box>
                </Item>
              </Grid>
            </Grid>
            {/* <Grid container className="mt-3">
              <Grid item xs={12}>
                <Item className='pt-2 pl-3 pr-3 pb-3'>
                  <TimeSetting handleCallbackTimeSetting={callbackTimeSetting}/>
                </Item>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
      <AddOperatorDialog open={addOperatorModal} closedModal={handleClosedModal} updateOperator={handleUpdateOperator} />
      <SnackbarMessage openSnackbar={openSnackbar} severityStatus={severity} handleCloseSnackbar={handleCloseSnackbar} message={message}/>
      <DeleteConfirmationDialog open={openDeleteModal} messageDelete={messageDelete} closedModal={handleClosedDeleteModal} callbackConfirmation={handleCallbackConfirmation} />
    </>
  );
}

export default Setting;


