import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

//select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import WarningIcon from '@mui/icons-material/Warning';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SwitchSystem from '../components/SwitchSystem'

//Component 
import LiveImageCheckDialog from '../components/LiveImageCheckDialog';

//Utils
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

//Api
import {operatorListApi} from '../Api/user'
import {productInfoApi} from '../Api/product'
import {getTimeSettingApi} from '../Api/setting';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '4px',
  boxShadow: 'none !important',
}));

const AIJudgement = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '11px 16px',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '8px',
  boxShadow: 'none !important',
}));

const SystemStatus = styled('div')(({ theme }) =>({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: '8px',
  boxShadow: 'none !important',
  "& .MuiSvgIcon-root":{
    width:'31px',
    height:'31px',
  },
  "& .MuiSvgIcon-root-success":{
    color: 'white !important',
    background: 'linear-gradient(0deg, #AADE72, #AADE72), linear-gradient(270.29deg, #B5FE57 2.18%, rgba(182, 233, 169, 0.85) 90.95%) !important',
    borderRadius: '100% !important',
  },
  "& .MuiSvgIcon-root-secondary":{
    color: '#6D7A8B !important',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(270.29deg, #9098A3 2.18%, rgba(23, 50, 86, 0.85) 90.95%) !important',
    borderRadius: '100% !important',
  },
  "& .circle-icon":{
    width: '48px',
    height: '48px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    background: '#F0E9FF !important',
    border: '1.5px solid #FFFFFF !important',
    boxShadow: '0px 49.4118px 78.2353px rgba(22, 29, 36, 0.08) !important',
    backdropFilter: 'blur(162.647px) !important',
    /* Note: backdrop-filter has minimal browser support */
    borderRadius: '247.059px !important',
    "&.success":{
      "&:hover":{
        background: 'linear-gradient(0deg, #AADE72, #AADE72), linear-gradient(270.29deg, #B5FE57 2.18%, rgba(182, 233, 169, 0.85) 90.95%) !important',
      }
    }
  }
}));

const DataSummaryIcon =  styled('div')(props =>({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  "& .icon":{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: props.bgColor,
    "& .MuiSvgIcon-root":{
      color: props.bgColorIcon,
      width: '20px',
      height: '20px',
    }
  }
}))

function Home() {
  const navigate = useNavigate()
  const location = useLocation();

  const [openLiveImageModal, setOpenLiveImageModal] = React.useState(false);
  const [operator, setOperator] = React.useState('-');
  const [operatorName, setOperatorName] = React.useState('-');
  const [operatorOptions, setOperatorOptions] = React.useState([])
  const [barcode, setBarcode] = React.useState('')
  const [productDetail, setProductDetail] = React.useState({})
  const [disableBtnInitiate, setDisableBtnInitiate] = React.useState(true)
  const [productChecked, setProductChecked] = React.useState(0)
  const [productGood, setProductGood] = React.useState(0)
  const [productNotGood, setProductNotGood] = React.useState(0)
  const [productDisposition, setProductDisposition] = React.useState(0)
  const [productInfo, setProductInfo]=React.useState([
    {
      name: 'Checked',
      total: '-',
      icon: <CheckCircleIcon />,
      bgColorIcon: '#7A40F2',
      bgColor: '#F0E9FF'
    },
    {
      name: 'Good',
      total: '-',
      icon: <ThumbUpIcon />,
      bgColorIcon: '#3ACBE9',
      bgColor: '#D8F8FF'
    },
    {
      name: 'Not Good',
      total: '-',
      icon: <ThumbDownIcon />,
      bgColorIcon: '#FF9060',
      bgColor: '#FFEDE5'
    },
    {
      name: 'Disposition',
      total: '-',
      icon: <WarningIcon />,
      bgColorIcon: '#F4C427',
      bgColor: '#FFF7DE'
    },
  ])
  const handleBtnInspectionStatus = (status)=>{
    // status = true => active button
    // status = false => disabled button
    setDisableBtnInitiate(status)
  }
  const handleChangeOperatorName = (event) => {
    setOperator(event.target.value);
    let operator = operatorOptions.filter((item)=>{
      if(item.id == event.target.value) return item
    })
    setOperatorName(operator[0] ? operator[0].fullName : '-')
    setLocalStorage('operator', operator)
  };

  const handleClosedModal = async(item)=>{
    await handleInspection()
    setOpenLiveImageModal(false)
  }
  const handleInspection = async() =>{
    try {
      navigate('/inspection')
    } catch (error) {
      console.log(error)
    }
  }
// Method for hit api
  const receiveProductInfo = async()=>{
    try {
      let response = await productInfoApi()
      setProductChecked(response.data['total'])
      setProductGood(response.data['good'])
      setProductNotGood(response.data['not good'])
      setProductDisposition(response.data['disposition'])
      // let result = []
      // result = productInfo
      // result[0].total = await response.data['total']
      // result[1].total = await response.data['good']
      // result[2].total = await response.data['not good']
      // result[3].total = await response.data['disposition']
      // setTimeout(() => {
      //   setProductInfo(result)
      // }, 2000);

    } catch (error) {
      console.log(error)
    }
  }
  const receiveOperatorList = async()=>{
    try {
      let response = await operatorListApi()
      setOperatorOptions(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const receiveTimeSetting = async () => {
    try {
      let response = await getTimeSettingApi(1)
      if (response.data) {
        let body = {
          userId: response.data.userId,
          delayTime: response.data.delayTime,
          allowanceTime: response.data.allowanceTime,
          outputRedirectTime: response.data.outputRedirectTime
        }
        setLocalStorage('timeSetting', body)
      }
    } catch (error) {
      console.log(error)
    }
  }
// ////////////////////////////////////////
  // React.useEffect(() => {

  // }, [productInfo]);

  React.useEffect(() => {
    if (location.pathname == '/' && location.state) {
      let barcode = location.state ? location.state.barcode : ''
      let productDetail = location.state ? location.state.productDetail : {}
      setBarcode(barcode)
      setProductDetail(productDetail)
      setOpenLiveImageModal(true)
    }
  }, [location]);

  React.useEffect(() => {
    // set local storage barcode
    setLocalStorage('barcode',{status: ""})
    // get local storage user to get status system is active or deactive
    let systemStatus = getLocalStorage('user').isActive
    setDisableBtnInitiate(systemStatus)
    // get local storage to set operator from last operator choosen
    setLocalStorage('operator', [{email:'admin@admin.com',firstName:"Admin",fullName:"Admin",id:1,lastLogin:null,lastName:""}])
    if (getLocalStorage('operator')){
      let operator = getLocalStorage('operator')
      if(operator.length !=0){
        setOperator(operator[0].id);
        setOperatorName(operator[0].fullName)
      }
    }
    // get data operator list
    receiveOperatorList()
    // get data dashboard
    receiveProductInfo()
    // get data time setting
    receiveTimeSetting()
    if(getLocalStorage('refreshLimit')){
      if(getLocalStorage('refreshLimit').data == 3){
        console.log(getLocalStorage('refreshLimit').status)
        if(getLocalStorage('refreshLimit').status == 'good'){
          console.log("vdvjkdfjk")
          setLocalStorage('refreshLimit', { data: 1, status: 'good' })
          setTimeout(()=>{
            navigate('/inspection')
          },1000)
        }else{
          setLocalStorage('refreshLimit', { data: 1, status: 'not good' })
        }
      }
    }
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="mt-5">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={9}>
            <h3>Big Engine Crack Detection System</h3>
          </Grid>
          <Grid item xs={3}>
            <AIJudgement>
              <h5 className="m-0">AI Judgement</h5>
              <SwitchSystem handleDisabledBtnInspection={handleBtnInspectionStatus}/>
            </AIJudgement>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} className="mt-5">
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <SystemStatus className='pt-2 pl-3 pr-3 pb-3'>
              <h5 className="m-0 text-grey font-weight-bolder">System Status</h5>
              <Grid className="mt-3" container spacing={2} alignItems="center">
                <Grid item xs={4} className="text-center">
                  <div className='d-flex justify-content-center'>
                    <div className="circle-icon success text-center">
                      <PowerSettingsNewIcon className={disableBtnInitiate ? 'MuiSvgIcon-root-success' : 'MuiSvgIcon-root-secondary'} />
                    </div>
                  </div>
                  <h6 className="m-0 font-weight-bolder text-grey">System Ready</h6>
                </Grid>
                <Grid item xs={4} className="text-center">
                  <div className='d-flex justify-content-center'>
                    <div className="circle-icon success text-center">
                      <PowerSettingsNewIcon className={disableBtnInitiate ? 'MuiSvgIcon-root-success' : 'MuiSvgIcon-root-secondary'} />
                    </div>
                  </div>
                  <h6 className="m-0 font-weight-bolder text-grey">AI Standby</h6>
                </Grid>
                <Grid item xs={4} className="text-center">
                  <div className='d-flex justify-content-center'>
                    <div className="circle-icon text-center">
                      <PowerSettingsNewIcon className={disableBtnInitiate ? 'MuiSvgIcon-root-success' : 'MuiSvgIcon-root-secondary'} />
                    </div>
                  </div>
                  <h6 className="m-0 font-weight-bolder text-grey">AI Proccessing</h6>
                </Grid>
              </Grid>
            </SystemStatus>
          </Grid>
          <Grid item xs={6} alignItems="center">
            <SystemStatus className='pt-2 pl-3 pr-3 pb-6'>
              <Grid container spacing={6} alignItems="center">
                {/* <Grid item xs={6}>
                  <h5 className="m-0 text-grey font-weight-bolder">Operator Name</h5>
                  <FormControl className="mt-3" sx={{ minWidth: '100%' }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Operator Name</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={operator}
                      onChange={handleChangeOperatorName}
                      autoWidth
                      label="Operator Name"
                    >
                      <MenuItem value={'-'}>
                        <em>None</em>
                      </MenuItem>
                      {
                        operatorOptions.map((item)=>(
                          <MenuItem value={item.id} key={item.id}>{item.fullName}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <h5 className="m-0 font-weight-bolder text-grey">Product Inspect Scanning</h5>
                    {
                      disableBtnInitiate ? 
                        <Button 
                          onClick={handleInspection}
                          className="mt-3 w-100 bg-primary font-weight-bolder box-shadow-1"
                          variant="contained"
                          type="submit"
                          style={{ height: '48px', borderRadius: '8px', }}
                        >
                          Initiate Inspection
                        </Button>
                      :
                        <Button 
                          className="mt-3 w-100 bg-secondary font-weight-bolder box-shadow-1 text-grey"
                          style={{ height: '48px', borderRadius: '8px' }}
                        >
                          Initiate Inspection
                        </Button>
                    }
                </Grid>
              </Grid>
            </SystemStatus>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} className="mt-5">
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <SystemStatus className='pt-2 pl-3 pr-3 pb-3'>
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={6}>
                  <h5 className="m-0 font-weight-bolder text-grey">Data Summary</h5>
                </Grid>
                <Grid item xs={6}>
                  <Box 
                    className="d-flex justify-content-between align-items-center pr-2 pl-2"
                    sx={{
                      width:'100%',
                      height: '48px',
                      background: '#FFFFFF',
                      border: '1px solid #D9DBE1',
                      borderRadius: '8px'
                    }}
                  >
                    <h6 className='m-0 font-weight-light text-grey-2'>Operator Name: {operatorName}</h6>
                    <h6 className='m-0 font-weight-light text-grey-2'>Date Time: {new Date().toLocaleDateString('en-IN')}</h6>
                  </Box>
                </Grid>
              </Grid>
              <Grid className="mt-2" container spacing={6} alignItems="center">
                <Grid className="pt-0" item xs={3}>
                    <Box className="p-3" 
                      sx={{
                        width:'100%',
                        background: '#FFFFFF',
                        border: '1px solid #D9DBE1',
                        borderRadius: '16px'
                    }}>
                      <DataSummaryIcon bgColor={'#F0E9FF'} bgColorIcon={'#7A40F2'} >
                        <div className="icon mr-1">
                          <CheckCircleIcon />
                        </div>
                        <h6 className='m-0 font-weight-bolder text-grey'>
                          Checked
                        </h6>
                      </DataSummaryIcon>
                        <h1 className='m-0 font-weight-bolder text-grey'>
                          {productChecked}
                        </h1>
                        <h6 className='m-0 font-weight-light text-grey-2'>
                          Pieces
                        </h6>
                    </Box>
                  </Grid>
                  <Grid className="pt-0" item xs={3}>
                    <Box className="p-3"
                      sx={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D9DBE1',
                        borderRadius: '16px'
                      }}>
                      <DataSummaryIcon bgColor={'#D8F8FF'} bgColorIcon={'#3ACBE9'} >
                        <div className="icon mr-1">
                          <ThumbUpIcon />
                        </div>
                        <h6 className='m-0 font-weight-bolder text-grey'>
                          Good
                        </h6>
                      </DataSummaryIcon>
                      <h1 className='m-0 font-weight-bolder text-grey'>
                        {productGood}
                      </h1>
                      <h6 className='m-0 font-weight-light text-grey-2'>
                        Pieces
                      </h6>
                    </Box>
                  </Grid>
                  <Grid className="pt-0" item xs={3}>
                    <Box className="p-3"
                      sx={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D9DBE1',
                        borderRadius: '16px'
                      }}>
                      <DataSummaryIcon bgColor={'#FFEDE5'} bgColorIcon={'#FF9060'} >
                        <div className="icon mr-1">
                          <ThumbDownIcon />
                        </div>
                        <h6 className='m-0 font-weight-bolder text-grey'>
                          Not Good
                        </h6>
                      </DataSummaryIcon>
                      <h1 className='m-0 font-weight-bolder text-grey'>
                        {productNotGood}
                      </h1>
                      <h6 className='m-0 font-weight-light text-grey-2'>
                        Pieces
                      </h6>
                    </Box>
                  </Grid>
                  <Grid className="pt-0" item xs={3}>
                    <Box className="p-3"
                      sx={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D9DBE1',
                        borderRadius: '16px'
                      }}>
                      <DataSummaryIcon bgColor={'#FFF7DE'} bgColorIcon={'#F4C427'} >
                        <div className="icon mr-1">
                          <WarningIcon />
                        </div>
                        <h6 className='m-0 font-weight-bolder text-grey'>
                          Disposition
                        </h6>
                      </DataSummaryIcon>
                      <h1 className='m-0 font-weight-bolder text-grey'>
                        {productDisposition}
                      </h1>
                      <h6 className='m-0 font-weight-light text-grey-2'>
                        Pieces
                      </h6>
                    </Box>
                  </Grid>
              </Grid>
              {/* <Grid className="mt-2" container spacing={6} alignItems="center">
                { productInfo.map((item, index)=>(
                  <Grid className="pt-0" key={index} item xs={3}>
                      <Box className="p-3" 
                        sx={{
                          width:'100%',
                          background: '#FFFFFF',
                          border: '1px solid #D9DBE1',
                          borderRadius: '16px'
                      }}>
                      <DataSummaryIcon bgColor={item.bgColor} bgColorIcon={item.bgColorIcon} >
                          <div className="icon mr-1">
                              {item.icon}
                          </div>
                          <h6 className='m-0 font-weight-bolder text-grey'>
                            {item.name}
                          </h6>
                        </DataSummaryIcon>
                          <h1 className='m-0 font-weight-bolder text-grey'>
                            {item.total}
                          </h1>
                          <h6 className='m-0 font-weight-light text-grey-2'>
                            Pieces
                          </h6>
                      </Box>
                    </Grid>
                  ))
                }
              </Grid> */}
            </SystemStatus>
          </Grid>
        </Grid>
      </Box>
      <LiveImageCheckDialog open={openLiveImageModal} closedModal={handleClosedModal} operatorId={operator} operatorName={operatorName} barcode={barcode} productDetail={productDetail}/>
    </>
  );
}

export default Home;


