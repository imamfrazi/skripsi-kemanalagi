import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button } from '@mui/material';
import LinearProgressBars from "../components/LinearProggress";

import io from "socket.io-client";

//Api
import { productDeleteImagesApi } from "../Api/product";
//Utils
import { getLocalStorage } from "../utils/localStorage";

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
function InspectionProduct() {
  const socket = io(process.env.REACT_APP_SERVER_URL);

  const navigate = useNavigate()

  const [operator, setOperator] = useState({})
  const [btnProceed, setBtnProceed] = useState(false)
  const [timer,setTimer] = useState(0)
  const [timerLimit,setTimerLimit] = useState(1)
  const [qrCode, setqrCode] = useState({})
  const [scanImage, setScanImage] = useState(true);

  /////////////method socket//////////////
  // start socket
    const startToCheck = (qrCode, userId) => {
      setScanImage(true)
      addCheckImageSocket(qrCode, userId);
      sendToCheck(true, null);
    };

    const sendToCheck = (state, totalInit, qrCode, userId) => {
      socket.emit("scan_img_dir", {
        state,
        totalInit,
        qrCode: qrCode,
        userId: userId
      });
    };

    const addCheckImageSocket = (qrCode, userId) => {
      socket.on("scan_img_dir", (msg) => {
        if (msg.state === true) {
          // console.log("check image true: ", msg.message);
          sendToCheck(true, msg.data.totalInit, qrCode, userId);
        } else if (msg.state === false) {
          if (msg.error) {
            console.log("error: ", msg.error);
          }
          setScanImage(false)
          // console.log("check image stopped: ", msg.message);
        }
      });
    };
  //stop socket
    const stopToCheck = async () => {
      console.log("socket stop scan_img_dir")
      socket.off("scan_img_dir");
    };
  //////////////

  const handleProccess = ()=>{
    navigate('/inspection/scan/loading')
  }

  const handleClosed = async() => {
    try{
      let response = await productDeleteImagesApi({})
      localStorage.setItem('barcode', JSON.stringify({ status: "" }))
      navigate('/')
    }catch(error){

    }
  }

  useEffect(()=>{
    console.log("ini inspection product")
    let QRCode = {}
    if (getLocalStorage('qrCode')) {
      setqrCode(getLocalStorage('qrCode'))
      QRCode = getLocalStorage('qrCode')
    }
    let operatorLocalStorage = []
    if (localStorage.getItem('operator')) {
      operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
      setOperator(operatorLocalStorage[0])
    }
    // start socket scan_image_dir
    startToCheck(QRCode.data.qrCode, operatorLocalStorage[0].id)
    // stop socket scan_image_dir
    return () => stopToCheck()
    
  }, [])

  // check image/product will be stop when backend have been get 8 image/product
  useEffect(() => {
    let operatorLocalStorage = []
    var interval=0

    if (!scanImage) {
      if (localStorage.getItem('operator')) {
        operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
        setOperator(operatorLocalStorage[0])
      }

      navigate('/inspection/scan/loading')

    }else {
      let timeSetting = getLocalStorage('timeSetting')
      setTimerLimit(timeSetting.allowanceTime/1000)
      interval = setInterval(()=>setTimer(timer => timer +1 ), 1000);
    }
    return ()=> clearInterval(interval)
  }, [scanImage]);

  useEffect(() => {
    console.log("ini timer", timer)
    let timeSetting = getLocalStorage('timeSetting')
    if (timer == timeSetting.allowanceTime/1000) {
      console.log("ini sudah berhasil pindah")
      navigate('/inspection/scan/loading')
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
            <LinearProgressBars progress={(timer / timerLimit)*100}/>
            <h3 className="m-0 font-weight-bolder text-grey text-center" style={{ lineHeight: '25px' }}>{!btnProceed ? 'Please wait for dinolite capturing object' : 'Press proceed button, robot already finish capturing image'}</h3>
            {
              btnProceed ?
                <div className='d-flex justify-content-center w-100' style={{ marginTop: '40px' }}>
                  <Button onClick={handleProccess} className="font-weight-bolder box-shadow-1 bg-primary" variant="contained" type="submit" style={{ height: '48px', borderRadius: '8px', }}>Procced</Button>
                </div>
              :null
            }
            {/* hidden this button */}
            <div className='d-flex justify-content-center w-100 mt-2' >
              <Button onClick={handleClosed} className="bg-white text-grey font-weight-bolder box-shadow-1" variant="contained" type="submit" style={{ height: '48px', borderRadius: '8px', }}>Cancel</Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default InspectionProduct;