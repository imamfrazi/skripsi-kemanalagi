import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import Loading from '../components/Loading'
import io from "socket.io-client";

// API
import { productDetailApi } from '../Api/product'

//Utils
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'
//Components
import NoProductDialog from "../components/NoProductDialog";
import LinearProgressBars from "../components/LinearProggress";

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

function InspectionLoading() {
  const socket = io(process.env.REACT_APP_SERVER_URL);
  const navigate = useNavigate()
  const [statusScanImageSave, setStatusScanImageSave] = useState({})
  const [statusModal, setStatusModal] = useState(false)

  const handleProcess = async () => {
    let QRCode = {}
    if (getLocalStorage('qrCode')) {
      QRCode = getLocalStorage('qrCode')
    }
    let operatorLocalStorage = []
    if (getLocalStorage('operator')) {
      operatorLocalStorage = getLocalStorage('operator')
    }
    let body = {
      qrCode: QRCode.data.qrCode,
      userId: operatorLocalStorage[0].id,
    }

    let response = await productDetailApi(body)
    setLocalStorage('productDetail', response.data.data)
    navigate('/inspection/scan/finished')
  }
  useEffect(() => {
    let QRCode = {}
    if (getLocalStorage('qrCode')) {
      QRCode = getLocalStorage('qrCode')
    }
    let operatorLocalStorage = []
    if (getLocalStorage('operator')) {
      operatorLocalStorage = getLocalStorage('operator')
    }
    socket.emit("scan_img_save", {
      qrCode: QRCode.data.qrCode,
      userId: operatorLocalStorage[0].id,
    });
    socket.on("scan_img_save", (msg) => {
      setStatusScanImageSave(msg)
    });

    return () => {
      socket.off("scan_img_save")
      setStatusModal(false)
    }
  }, []);

  useEffect(() => {
    if (statusScanImageSave.status == 200) {
      handleProcess()
    } else if (statusScanImageSave.status == 400) {
      setStatusModal(true)
    }
  }, [statusScanImageSave]);

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
            {/* <LinearProgress component={'please-wait'}/> */}
            <LinearProgressBars component={'please-wait'} />
            <h3 className="m-0 font-weight-bolder text-grey text-center">Please Wait</h3>
          </Box>
        </Grid>
      </Grid>
      {
        statusModal ?
          <NoProductDialog />
          :
          null
      }
    </div>
  );
}

export default InspectionLoading;