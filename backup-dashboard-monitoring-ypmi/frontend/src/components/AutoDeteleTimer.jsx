import React, { useState, useRef, useEffect } from 'react'
import SnackbarMessage from './SnackbarMessage';
import { Box } from '@mui/material';

import { getLocalStorage } from '../utils/localStorage';


const AutoDeleteTimer = ({ handlestoptimer }) => {

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState(0);
  const [timerDelete, setTimerDelete] = useState(1);
  const [deleteTime, setDeleteTime] = useState('-')



  useEffect(() => {
    // console.log(timer,"ini Timer ")
    if (timer >= timerDelete) {
      handlestoptimer()
      localStorage.removeItem("autoDeleteTimer");
    }
  }, [timer]);

  useEffect(() => {
    let interval = 0
    if(getLocalStorage('autoDeleteTimer')){
      let dateTime= getLocalStorage('autoDeleteTimer').datetime
      setDeleteTime(Date.parse(dateTime) + 3600 * 1000)
      setTimerDelete((Date.parse(dateTime) + 3600 * 1000) - Date.parse(new Date()))
    }

    interval = setInterval(() => setTimer(timer => timer + 1000), 1000);
    return () => clearInterval(interval)
  }, []);


  return (
    <Box className="" sx={{ zIndex: 20, width: '100%', backgroundColor: 'red', position: 'fixed', height: '50px'  }}>
      <div className="d-flex m-0 font-weight-bolder justify-content-center text-white align-items-center h-100">Harap Perhatian ! Bahwa akan dilakukan hapus data hari ini pukul: {new Date(deleteTime).toLocaleTimeString('en-IN')}</div>
      {/* <SnackbarMessage openSnackbar={true} message={timer} /> */}
      {/* <button onClick={onClickReset}>Reset</button> */}
    </Box>
  )
}

export default AutoDeleteTimer;

