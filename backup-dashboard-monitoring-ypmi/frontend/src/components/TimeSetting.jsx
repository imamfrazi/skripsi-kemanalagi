import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Api
import { getTimeSettingApi, timeSettingSaveApi } from '../Api/setting';

const TimeSettingInput = styled('div')(({ theme }) => ({

  'input':{
    width: '100%',
    borderRadius: '8px',
    border: '2px solid #D9DBE1',
    fontSize: '16px',
    fontWeight: 400,
    padding:'16px',
    marginTop: '8px',
    'p':{
      fontWeight: '400 !important',
      fontSize: '13px !important'
    }
  }
}));
export default function TimeSetting({ handleCallbackTimeSetting }) {
  const [timeSetting, setTimeSetting] = React.useState({})
  const [allowanceTime, setAllowanceTime] = React.useState(0)
  const [delayTime, setDelayTime] = React.useState(0)
  const [outputRedirectTime, setOutputRedirectTime] = React.useState(0)
  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      let body = {
        userId: 1,
        delayTime: delayTime * 1000,
        allowanceTime: allowanceTime * 1000,
        outputRedirectTime: outputRedirectTime * 1000
      }
      let response = await timeSettingSaveApi(body)
      handleCallbackTimeSetting({status:true, message:'Time setting saved successfully', severityStatus: 'success'})
      console.log(response.data)
    }catch(error){
      handleCallbackTimeSetting({ status: false, message: 'Time setting saved failed', severityStatus: 'false' })
      console.log(error)
    }
  }
  // method hit api
  const receiveTimeSetting = async () => {
    try {
      let response = await getTimeSettingApi(1)
      if (response.data) {
        setAllowanceTime(response.data.allowanceTime / 1000)
        setDelayTime(response.data.delayTime / 1000)
        setOutputRedirectTime(response.data.outputRedirectTime / 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  //////////////////
  React.useState(()=>{
    receiveTimeSetting()
  },[])
  return (
    <>
    <Box>
        <h5 className="m-0 text-grey font-weight-bolder">Time Setting</h5>
        <form onSubmit={handleSubmit}>
          <TimeSettingInput>
            <Box className="mt-3">
              <h6 className='m-0 text-grey-2 font-weight-bolder'> Delay Time</h6>
              <input type="number" min="0" value={delayTime} onChange={e => setDelayTime(e.target.value)} placeholder="0 detik"></input>
              <p className='m-0'>Waktu untuk arm robot mempersiapkan titik capture pada object</p>
            </Box>
            <Box className="mt-3">
              <h6 className='m-0 text-grey-2 font-weight-bolder'> Allowance Time</h6>
              <input type="number" min="0" value={allowanceTime} onChange={e => setAllowanceTime(e.target.value)} placeholder="0 detik"></input>
              <p className='m-0'>Batas waktu yang diperbolehkan untuk listening image dari awal trigger relay robot</p>
            </Box>
            <Box className="mt-3">
              <h6 className='m-0 text-grey-2 font-weight-bolder'> Output Redirect Time</h6>
              <input type="number" min="0" value={outputRedirectTime} onChange={e => setOutputRedirectTime(e.target.value)} placeholder="0 detik"></input>
              <p className='m-0'>Waktu untuk beralih dari halaman scan finished ke scan image review</p>
            </Box>
          </TimeSettingInput>
          <Box className="d-flex justify-content-end mt-2">
            <Button className="bg-primary" variant="contained" type="submit" sx={{ width: '20%', height: '40px' }}>Save</Button>
          </Box>
        </form>
    </Box>
    </>
  );
}
