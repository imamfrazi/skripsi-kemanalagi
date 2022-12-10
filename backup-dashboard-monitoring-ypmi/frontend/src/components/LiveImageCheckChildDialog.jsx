import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import PropTypes from 'prop-types';
import DetailCrackTable from './DetailCrackTable'

//Assets
import SampleImage from '../assets/sample-image2.svg';

//API
import { productInspectionUpdateApi } from '../Api/product'

//Utils
import { imageURL } from '../utils/imageURL';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '1233px',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  pt: 4,
  px: 2,
  pb: 2,
};

const customColor = (status) => {
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
  value: item,
  name: 'color-radio-button-demo',
  inputProps: { 'aria-label': item },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop:'8px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: '1px solid #D9DBE1',
  borderRadius: '0px'
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function LiveImageCheckChildDialog({ openNestedModal, closeNestedModal, choosenImage, changeJudgmentOperator, refreshModal, index }) {
  const [judgmentOperator, setJudgementOperator] = React.useState('-');
  const [imageMap, setImageMap] = React.useState({})
  const [noteText, setNoteText] = React.useState('')
  const handleChange = (event) => {
    setJudgementOperator(event.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick')
    closeNestedModal()
    setJudgementOperator('');
  };
  const imageENV = (item, imagePoint='ai') => {
    try {
      let result = imageURL(item,imagePoint)
      return result
    } catch (error) {
      console.log(error)
    }
  }
  // method hit endpoint
  const handleOperatorJudgment = async() => {
    try{
      let originalChoosenImage = imageMap
      originalChoosenImage.status = judgmentOperator 
      let body = {
        note:noteText,
        userStatus: originalChoosenImage.status,
        id: imageMap.id,
      }
      let response = await productInspectionUpdateApi(body)
      changeJudgmentOperator(originalChoosenImage)
      refreshModal()
      setJudgementOperator('');
      setNoteText('')
    }catch(error){

    }
  };
  React.useEffect(()=>{
    if(openNestedModal){
      let choosenImageMapping = {}
      choosenImageMapping= choosenImage.filter((item)=>{
        return item.aiGenerated == true
      })
      let status = "-"
      if (choosenImageMapping[0].userStatus){
        status = choosenImageMapping[0].userStatus
      }
      if(choosenImageMapping[0].note){
        setNoteText(choosenImageMapping[0].note)
      }else{
        setNoteText('')
      }
      setImageMap(choosenImageMapping[0])
      setJudgementOperator(status)
    }
  },[openNestedModal])
  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={openNestedModal ? openNestedModal : false}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style}}>
          <Box className='d-flex justify-content-between'>
            <Grid
              container
              direction="row"
              justifyContent="between"
              alignItems="center"
              spacing={2}
              className="mb-2"
            >
              <Grid item xs={7}>
                <h3 className='m-0 font-weight-bolder'>Image Point {index}</h3>
              </Grid>
            </Grid>
          </Box>
          {/* <Box className='d-flex justify-content-between mb-2' sx={customTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
              <Tabs
                value={tab} onChange={handleTab} 
                aria-label="basic tabs example"
              >
                <Tab className='font-weight-bolder' label="Detail Image" {...a11yProps(0)} />
                <Tab className="font-weight-bolder" label="Detail Check" {...a11yProps(1)} />
              </Tabs>
            </Box>
        </Box> */}
        {/* <TabPanel value={tab} index={0}> */}
          <Grid
            container
            direction="row"
            className="mt-2 border-bottom-light pb-2"
            justifyContent='between'
            alignItems='start'
          >
            <Grid item xs={7}>
              <Grid container direction="row">
                <Grid className="font-weight-light" item xs={3}>Ai Judgment</Grid>
                <Grid item xs={6}>: {imageMap.aiStatus}</Grid>
              </Grid>
              {/* <Grid container direction="row">
                <Grid className="font-weight-light" item xs={3}>Value</Grid>
                <Grid item xs={6}>: {imageMap.aiConfidence ? imageMap.aiConfidence : '-'}</Grid>
              </Grid> */}
              <Grid container direction="row">
                <Grid className="font-weight-light" item xs={3}>ID Product Inspection</Grid>
                <Grid item xs={6}>: {imageMap.id ? imageMap.id : '-'}</Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={5}>
                <Grid container alignItems='center' direction="row">
                  <Grid className="font-weight-light" item xs={6}>Operator Judgment</Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ minWidth: 160 }} size="small">
                      <InputLabel id="demo-select-small">Judgment</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={judgmentOperator}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={''}>
                          <em>-</em>
                          </MenuItem>
                        <MenuItem value={'ok'}>Ok</MenuItem>
                        <MenuItem value={'not good'}>Not Good</MenuItem>
                        <MenuItem value={'disposition'}>Disposition</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                </Grid>
            </Grid> */}
          </Grid>
          <Grid
            container
            direction="row"
            spacing={2}
            className="mt-2"
          >
            <Grid item xs={4}>
              <h6 className='m-0 text-grey-2 font-weight-bolder'>Detail Image</h6>
              <Item>
                <Box className='d-flex justify-content-center align-items-center '>
                  <div className='w-100'>
                    <div style={{ height: '423px' }}>
                      <img
                        src={imageENV(imageMap.imagePath)}
                        alt="Yamaha Crack"
                        loading="lazy"
                        width="100%"
                        height="100%"
                        style={{ overflow: 'hidden' }}
                        />
                    </div>
                  </div>
                </Box>
                <p className='m-0 text-center'>Ai Image</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <h6 className='m-0 font-weight-bolder text-white' style={{color:'white'}}>"</h6>
              <Item>
                <Box className='d-flex justify-content-center align-items-center'>
                  <div className='w-100'>
                    <div  style={{ height: '423px' }}>
                      <img
                        src={imageENV(imageMap.image, "preview")}
                        alt="Yamaha Crack"
                        loading="lazy"
                        width="100%"
                        height="100%"
                        style={{ overflow: 'hidden' }}
                      />
                    </div>
                  </div>
                </Box>
                <p className='m-0 text-center'>Preview Image</p>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Box className="pl-1">
                <Box className="pl-1" sx={{ borderLeft:'1px solid #EEEFF4'}}>
                <h6 className='m-0 text-grey-2 font-weight-bolder mb-1'>Detail Crack (mm)</h6>
                  <DetailCrackTable imageMap={imageMap} />
                </Box>
              </Box>
              <Box className="pl-1">
                <Box className="pl-1" sx={{ borderLeft:'1px solid #EEEFF4'}}>
                <h6 className='m-0 mt-2 text-grey-2 font-weight-bolder mb-1'>Note</h6>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Type detail crack..."
                    value={noteText}
                    onChange={(e)=>setNoteText(e.target.value)}
                    style={{ borderLeft:'1px solid grey',minWidth:'370px',maxWidth: '100%' , height:"220px", maxHeight:"220px"}}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        {/* </TabPanel> */}
        {/* <TabPanel value={tab} index={1}>
          <DetailCrackTable/>
        </TabPanel> */}
        <Box className="d-flex justify-content-between align-items-end mt-3">
          <Box className="d-flex align-items-center">
            <h6 className="m-0 mr-1 font-weight-light">Operator Judgment: </h6>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={handleChange}
                  value={judgmentOperator}
                >
                  <FormControlLabel
                    value="-"
                    control={<Radio />}
                    label="-"
                  />
                  <FormControlLabel value={'good'} control={<Radio sx={{ color: 'rgba(0, 0, 0, 0.6)', '&.Mui-checked': { color: `${customColor('Good')}`, } }} />} label="Good" />
                  <FormControlLabel value={'not good'} control={<Radio  sx={{ color: 'rgba(0, 0, 0, 0.6)', '&.Mui-checked': { color: `${customColor('Not Good')}`, } }} />} label="Not Good" />
                  <FormControlLabel value={'disposition'} control={<Radio  sx={{ color: 'rgba(0, 0, 0, 0.6)', '&.Mui-checked': { color: `${customColor('Disposition')}`, } }} />} label="Disposition" />
                </RadioGroup>
              </FormControl>
            {/* <FormControl sx={{ minWidth: 160 }} size="small">
              <InputLabel id="demo-select-small">Judgment</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={judgmentOperator}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={'-'}>
                  <em>-</em>
                </MenuItem>
                <MenuItem value={'good'}>Good</MenuItem>
                <MenuItem value={'not good'}>Not Good</MenuItem>
                <MenuItem value={'disposition'}>Disposition</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          <div className='d-flex'>
              <Button onClick={handleClose} className="mr-2 w-100 bg-white text-grey-2 font-weight-bolder" variant="contained" style={{ height: '44px' }}>Cancel</Button>
              <Button onClick={handleOperatorJudgment} className="w-100 bg-primary font-weight-bolder" variant="contained" style={{ height: '44px' }}>Save</Button>
          </div>
        </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}