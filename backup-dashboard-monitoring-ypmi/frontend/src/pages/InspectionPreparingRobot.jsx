import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from '@mui/material';
import LinearProgressBars from "../components/LinearProggress";

import io from "socket.io-client";

//Utils
import { getLocalStorage } from "../utils/localStorage";
import {  productDeleteImagesApi  } from '../Api/product'

const border = {
  padding: '40px 24px',
  border: '2px solid white',
  borderRadius: '16px',
  minHeight: '300px',
  color: 'black',
  backgroundColor: 'white',
  "& .MuiBox-root": {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '64px'
  }
}
function InspectionPreparingRobot() {
  const socket = io(process.env.REACT_APP_SERVER_URL);

  const navigate = useNavigate()
  const [timer, setTimer] = useState(0)
  const [timerLimit, setTimerLimit] = useState(1)

  useEffect(() => {
    var interval = 0
    let timeSetting = getLocalStorage('timeSetting')
    setTimerLimit(timeSetting.delayTime / 1000)
    interval = setInterval(() => setTimer(timer => timer + 1), 1000);
    return () => {
      clearInterval(interval)
      productDeleteImagesApi()
    }
  }, [])

  useEffect(() => {
    console.log("ini delay timer", timer)
    let timeSetting = getLocalStorage('timeSetting')
    if (timer == timeSetting.delayTime / 1000) {
      console.log("ini sudah berhasil pindah")
      navigate('/inspection/scan/product')
    }
  }, [timer]);

  return (
    <div className='w-100 h-100'>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        className='vh-min-100'
      >
        <Grid item lg={6} style={{ maxWidth: '580px' }}>
          <Box sx={border}>
            <LinearProgressBars progress={(timer / timerLimit) * 100} />
            <h3 className="m-0 font-weight-bolder text-grey text-center" style={{ lineHeight: '25px' }}>{'Preparing Robot...'}</h3>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default InspectionPreparingRobot;