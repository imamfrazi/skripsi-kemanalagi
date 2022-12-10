import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SampleImage from '../assets/sample-image2.svg';
import YamahaLogo from '../assets/yamaha-logo.svg';
import LiveImageCheckChildDialog from './LiveImageCheckChildDialog';

// API
import { productInspectionListApi } from '../Api/product'

//Utils
import { imageURL } from '../utils/imageURL'
import DetailCrackTable from './DetailCrackTable';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: '2px solid #3ACBE9',
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    border: '1px solid grey',
    marginLeft: '16px',
    marginRight: '16px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 16px 0px 16px',
  },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper':{
    maxWidth: 'none !important',
  },
  '& .css-1xgjpwf-MuiGrid-root>.MuiGrid-item':{
    paddingLeft: '0px',
    paddingTop: '0px !important',
  },
  '& .css-18jy1ur-MuiPaper-root-MuiCard-root':{
    borderRadius: '0px !important',
  },
  '& .css-1t4vnk2-MuiDialogContent-root':{
    padding: '0px 0px !important',
  },
  '& .css-1xgjpwf-MuiGrid-root':{
    width: '100%',
    marginLeft: '0px !important',
    marginTop: '0px !important'
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
};

export default function LiveImageCheckDialog({open, closedModal, operatorId, operatorName, barcode, productDetail, productId}) {
  const navigate = useNavigate()
  const location = useLocation()
  // const [open, setOpen] = React.useState(false);
  const [timer, setTimer] = React.useState(0)
  const [selectedValue, setSelectedValue] = React.useState('e');
  const [openNestedModal, setOpenNestedModal] = React.useState(false);
  const [choosenImage, setChoosenImage] = React.useState({});
  const [imagePoint, setImagePoint] = React.useState([]);
  const [imageIndex, setImageIndex] = React.useState(0)
  const [metaImage, setMetaImage] = React.useState({})
  const customColor = (status) =>{
    switch (status.toLowerCase()) {
      case 'good':
        return '#3ACBE9 !important'
      case 'not good':
        return '#FF5942 !important'
      case 'disposition':
        return '#F4C427 !important'
      default:
        return '#3ACBE9 !important'
    }
  }
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closedModal(false)
    }
  }
  const handleNestedModal= (item,index) =>{
    if(item){
      setImageIndex(index+1)
      setOpenNestedModal(true)
      setChoosenImage(item)
    }
  }
  const handleCloseNestedModal = () =>{
    setOpenNestedModal(false)
  }
  const handleChangeJudgmentOperator = (judgmentOperator) =>{
    let newArr = [...imagePoint]
    // newArr[judgmentOperator.id-1] = judgmentOperator
    // setImagePoint(newArr)
  }
  const handleRefresh = async() =>{
    if(location.pathname == '/'){
      await productInspectionList({ userId: operatorId, qrCode: barcode })
    }else if(location.pathname == '/about'){
      await productInspectionList({ productId: productId })
    }
    setOpenNestedModal(false)
  }
  const imageENV =  (item) =>{
    try{
      let result = imageURL(item)
      return result
    }catch(error){
      console.log(error)
    }
  }
  // Method hit endpoint api
  const productInspectionList = async (body) => {
    try {
      console.log("ini id nya ya", body)
      await setImagePoint([])
      await setMetaImage({})
      let response = await productInspectionListApi(body)
      let result = response.data.data.filter((item, index)=>{
        let check = false
        item.filter((detail, index)=>{
          if(detail.aiGenerated){
            check=true
          }
        })
        if(check){
          return item
        }
      })
      if(result.length <= 0) {
        await setMetaImage(response.data.meta)
      }else {
        await setImagePoint(result)
        await setMetaImage(response.data.meta)
      } 
    }catch(error) {
      console.log("ini sampai error lo")
      if (location.pathname == '/') {
        alert("No product being scanned"+" "+ error.response.data.message)
        navigate('/inspection');
      }else if(location.pathname == '/about'){
        alert(error.response.data.message)
        navigate('/about')
      }
      localStorage.setItem('barcode', JSON.stringify({ status: "" }))
    }
  }

  React.useEffect(() => {
    let interval = 0
    if(open){
      if (location.pathname == '/') {
        productInspectionList({ userId: operatorId, qrCode: barcode})
        interval = setInterval(() => setTimer(timer => timer + 1), 1000);
      } else if (location.pathname == '/about'){
        productInspectionList({ productId: productId})
      }
    }
    return () => clearInterval(interval)
  }, [open, location]);
  
  React.useEffect(() => {
    // console.log("ini timer close modal otomatis", timer)
    if (timer == 10) {
      handleClose()
      navigate('/inspection');
    }
  }, [timer]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      { imagePoint.length > 0 ?
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth={true}
      >
        
        <BootstrapDialogTitle id="customized-dialog-title" >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <h3 className='m-0 font-weight-bolder'>Image Check</h3>
            </Grid>
            
            <Grid item xs={8}>
              <Grid
                container
                alignItems="start"
                justifyContent="center"
              >
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">Operator name</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.user ? metaImage.user.firstName : ''} {metaImage.user ? metaImage.user.lastName : ''}</h6>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">Model name</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.noShot}</h6>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">No Shot</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.qrCode}</h6>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={4}>
                      <h6 className="m-0 font-weight-light text-grey">Time</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {new Date(metaImage.updatedAt).toLocaleDateString('en-IN')}</h6>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BootstrapDialogTitle>
        
        <DialogContent dividers>
          <Box className="pl-1 d-flex">
            {
              ['Good','Not Good','Disposition'].map((item)=>(
                <Box className='d-flex' key={item}>
                  <Radio {...controlProps('e')} sx={{ color: 'white', '&.Mui-checked': { color: `${customColor(item)}`,} }}/>
                  <p>{item}</p>
                </Box>
            ))}
          </Box>
          <Grid
            container
            className="p-2"
            alignItems="center"
            spacing={2}
          >
            { imagePoint.map((item, index)=>(
                    <Grid item xs={12} sm={6}  md={4} lg={3} key={index} onClick={()=>handleNestedModal(item,index)}>
                      <Item sx={{ border: `5px solid ${item[0]?item[0].userStatus ? customColor(item[0].userStatus) : item[0].aiStatus ? customColor(item[0].aiStatus) : '-':'-'}` }}>
                      <h5 className="m-0 font-weight-bolder text-center">Image Point {index + 1}</h5>
                      <div className='d-flex justify-content-between' >
                        <div className='w-100 mr-1'>
                          <div style={{ height: '160px' }}>
                            <img
                              src={imageENV(item[0].imagePath)}
                              alt="Yamaha Crack"
                              loading="lazy"
                              width="100%"
                              height="100%"
                              style={{ overflow: 'hidden' }}
                              />
                          </div>
                          <p className='m-0 mr-1 text-start font-weight-light'>Ai Image</p>
                        </div>
                        <div className='w-100'>
                          <div style={{ height: '160px' }}>
                            <img
                              src={imageENV(item[1].imagePath)}
                              alt="Yamaha Crack"
                              loading="lazy"
                              width="100%"
                              height="100%"
                              style={{ overflow: 'hidden' }}
                              />
                          </div>
                          <p className='m-0 mr-1 text-start font-weight-light'>Preview Image</p>
                        </div>
                      </div>
                    </Item>
                  </Grid>
          ))}
          </Grid>
        </DialogContent>
        
        <DialogActions className='mt-2 pb-3'>
          <h5 className='m-0 font-weight-light'>Please click image to see the detail of AI Judgement</h5>
          <Button autoFocus onClick={handleClose} className="text-grey font-weight-bolder bg-white" variant="contained" type="submit" style={{ borderRadius: '8px', }}>close</Button>
        </DialogActions>
      </BootstrapDialog>
      :
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth={true}
      >
        
        <BootstrapDialogTitle id="customized-dialog-title" >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <h3 className='m-0 font-weight-bolder'>Image Check</h3>
            </Grid>
            
            <Grid item xs={8}>
              <Grid
                container
                alignItems="start"
                justifyContent="center"
              >
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">Operator name</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.user ? metaImage.user.firstName : ''} {metaImage.user ? metaImage.user.lastName : ''}</h6>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">Model name</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.qrCode}</h6>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">No Shot</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {metaImage.noShot}</h6>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid
                    container
                    alignItems="start"
                    justifyContent="center"
                  >
                    <Grid item xs={4}>
                      <h6 className="m-0 font-weight-light text-grey">Time</h6>
                    </Grid>
                    <Grid item xs={6}>
                      <h6 className="m-0 font-weight-light text-grey">: {new Date(metaImage.updatedAt).toLocaleDateString('en-IN')}</h6>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BootstrapDialogTitle>
        <DialogContent>
          <Box className="d-flex justify-content-center">
            <h4>The last object unsuccessfully proceed by the system</h4>
          </Box>
        </DialogContent>
        <DialogActions className='mt-2 pb-3 d-flex justify-content-end'>
          <Button autoFocus onClick={handleClose} className="text-grey font-weight-bolder bg-white" variant="contained" type="submit" style={{ borderRadius: '8px', }}>close</Button>
        </DialogActions>
      </BootstrapDialog>
      }
      <LiveImageCheckChildDialog openNestedModal={openNestedModal} closeNestedModal={handleCloseNestedModal} choosenImage={choosenImage} changeJudgmentOperator={handleChangeJudgmentOperator} refreshModal={handleRefresh} index={imageIndex}/>
    </div>
  );
}
