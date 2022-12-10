import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button, TextField, FormControl } from '@mui/material';
import io from "socket.io-client";
//Component
// import Loading from '../components/Loading'

//Utils
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";
// API
import { productSaveApi } from '../Api/product'

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
function Inspection() {
  const socket = io(process.env.REACT_APP_SERVER_URL);

  const navigate = useNavigate()

  const [operator, setOperator] = useState({})
  const [qrCode, setQRCode] =  useState('')

  const handleQRCode = () =>{
    // B4T521VF003000047034150820210018
    let qr = qrCode.slice(0,11)
    setLocalStorage('qrCode', {data:{qrCode: qr}})
    if (getLocalStorage('operator')) {
      let operatorLocalStorage = getLocalStorage('operator')
      setOperator(operatorLocalStorage[0])
      let body = {
        qrCode: qr,
        userId: operatorLocalStorage[0].id
      }
      saveQRCode(body)
    }
  }


  const handleClosed = () => {
    setLocalStorage('barcode', { status: '' })
    navigate('/')
  }

  // Method for hit api
  const saveQRCode = async (body) => {
    try {
      let response = await productSaveApi(body)
      navigate('/inspection/preparing/robot')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   console.log(callbackScanQR.state, "ini state")
  //   if (callbackScanQR.state) {
  //     if (getLocalStorage('operator')) {
  //       let operatorLocalStorage = getLocalStorage('operator')
  //       setOperator(operatorLocalStorage[0])
  //       let body = {}
  //       body = callbackScanQR.data
  //       body.userId = operatorLocalStorage[0].id
  //       saveQRCode(body)
  //       setLocalStorage('barcode', { status: "ready" })
  //     }
  //   }
  // }, [callbackScanQR.state]);

  // useEffect(() => {
  //   //if you want to remove redundant page on inspection product, you can remove set timeout
  //   handleCheckQR()
  //   // setTimeout(() => {
  //   //   setScan(true)
  //   // }, 3000);
  //   return () => socket.off("scan_qr_code");
  // }, []);


  useEffect(() => {
    if (getLocalStorage('qrCode')) {
      setLocalStorage('qrCode', {})
    }
    if(getLocalStorage('refreshLimit')){
      if(getLocalStorage('refreshLimit').data == 3){
        setLocalStorage('refreshLimit', { data: 3, status: getLocalStorage('refreshLimit').status })
        window.location.href = "/";
      }
    }
    // socket.emit("scan_qr_code", "Scan QR start");
    // socket.on("scan_qr_code", async (msg) => {
    //   setqrCode(msg)
    // });

    // return () => socket.off('scan_qr_code')
  }, []);



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
            {/* <Loading /> */}
            <h3 className="m-0 font-weight-bolder text-grey text-center">Please scan the barcode</h3>
            <FormControl className="w-100 mt-3">
              <TextField 
                sx={{ marginBottom: '20px' }} 
                id="barcode" 
                autoFocus
                onChange={e => setQRCode(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Enter key pressed');
                    handleQRCode(e)
                    // write your functionality here
                  }
                }}
                variant="outlined" 
                type="text" 
              />
            </FormControl>
            <div className='d-flex justify-content-center w-100 mt-1' >
              <Button onClick={handleClosed} className="bg-white text-grey font-weight-bolder box-shadow-1" variant="contained" type="submit" style={{ height: '48px', borderRadius: '8px', }}>Cancel</Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Inspection;