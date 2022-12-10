import { Fragment, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box, Button} from '@mui/material';
import Loading from '../components/Loading'
import CheckFinished from '../assets/check-finished.svg'

// API
import { productDetailApi, productSaveApi } from '../Api/product'
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
function Inspection({ handleCheckImage, handleStopCheckImage, callbackScanImage, callbackScanQR, callbackScanAi, handleCheckQR, handleScanAIJudgment }) {
  const navigate = useNavigate()
  const [barcodeScan, setBarcodeScan] = useState(false);
  const [btnProccedJig, setBtnProccedJig] = useState(false);
  const [finishedProccess, setFinishedProccess] = useState(false);
  const [operator, setOperator] = useState({})
  const [productDetail, setProductDetail] = useState({})
  const [scan, setScan] = useState(false)
  const [pleaseWaitLoading, setPleaseWaitLoading] = useState(false)
  const [condition, setCondition] = useState(false)

  const handleProccess = async() =>{
    try{
      let body = {
        userId:operator.id,
        qrCode: callbackScanQR.data.qrCode,
      }
      let response = await productDetailApi(body)
      let product = response.data.data
      await setProductDetail(product)
      setCondition(true)
      setPleaseWaitLoading(true)
      await handleScanAIJudgment(body)
      

      // setTimeout(() => {
      //   if(product.status == 'ok'){
      //       navigate('/', {
      //         state: {
      //         crack: false,
      //         barcode: callbackScanQR.data.qrCode,
      //         productDetail: product
      //       }
      //     });
      //   }else{
      //     navigate('/', {
      //       state: {
      //         crack: true,
      //         barcode: callbackScanQR.data.qrCode,
      //         productDetail: product
      //       }
      //     });
      //   }
      // },10000);
      // localStorage.setItem('barcode', JSON.stringify({ status: "" }))
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    if(callbackScanAi){
      setFinishedProccess(true)
      setTimeout(() => {
          if (localStorage.getItem('barcode') && JSON.parse(localStorage.getItem('barcode')).status == "finished"){
            if(productDetail.status == 'ok'){
              navigate('/', {
                state: {
                crack: false,
                barcode: callbackScanQR.data.qrCode,
                productDetail: productDetail
              }
            });
          }else{
            navigate('/', {
              state: {
                  crack: true,
                  barcode: callbackScanQR.data.qrCode,
                  productDetail: productDetail
                }
            });
          }
          localStorage.setItem('barcode', JSON.stringify({ status: "" }))
        }
      }, 1000);
    }
  }, [callbackScanAi]);

  const handleClosed = () =>{
    handleStopCheckImage(callbackScanQR.data.qrCode, operator.id)
    localStorage.setItem('barcode', JSON.stringify({ status: "" }))
    navigate('/')
  }
  // Method for hit api
  const saveQRCode = async (body) => {
    try {
      let response = await productSaveApi(body)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  ////////////////////////////////////////
  useEffect(() => {
    if (localStorage.getItem('barcode') && JSON.parse(localStorage.getItem('barcode')).status == "ready"){
      let operatorLocalStorage = []
      if (localStorage.getItem('operator')) {
        operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
        setOperator(operatorLocalStorage[0])
      }
      setTimeout(() => {
        setBarcodeScan(true)
      }, 4000);
      handleCheckImage(callbackScanQR.data.qrCode, operatorLocalStorage[0].id)
      setTimeout(() => {
        handleStopCheckImage(callbackScanQR.data.qrCode, operatorLocalStorage[0].id)
          localStorage.setItem('barcode',JSON.stringify({status: "finished"}))
          setBtnProccedJig(true)
        }, 7000);
    }else if (localStorage.getItem('barcode') && JSON.parse(localStorage.getItem('barcode')).status == "finished"){
      console.log("telah di stop")
      let operatorLocalStorage = []
      if (localStorage.getItem('operator')) {
        operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
        setOperator(operatorLocalStorage[0])
      }
      setBtnProccedJig(true)
      handleStopCheckImage(callbackScanQR.data.qrCode, operatorLocalStorage[0].id)
    }else {
      if (localStorage.getItem('barcode') && JSON.parse(localStorage.getItem('barcode')).status == "") {
        handleCheckQR()
        setTimeout(() => {
          setScan(true)
        }, 50);
      }
    }
  }, []);

  // check image/product will be stop when backend have been get 8 image/product
  useEffect(() => {
    if (!callbackScanImage) {
      let operatorLocalStorage = []
      if (localStorage.getItem('operator')) {
        operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
        setOperator(operatorLocalStorage[0])
      }
      console.log("telah di stop gambar sudah 8 imgae")
      handleStopCheckImage(callbackScanQR.data.qrCode, operatorLocalStorage[0].id)
    }
  }, [callbackScanImage])

  // when barcode found system will execute this below use effect
  useEffect(() => {
    if(scan){
      if (callbackScanQR.data) {
        if (localStorage.getItem('operator')) {
          let operatorLocalStorage = JSON.parse(localStorage.getItem('operator'))
          setOperator(operatorLocalStorage[0])
          console.log("ini mau ngesave lho")
          let body = {}
          body = callbackScanQR.data
          body.userId = operatorLocalStorage[0].id
          saveQRCode(body)
          localStorage.setItem('barcode', JSON.stringify({ status: "ready" }))
          setBarcodeScan(true)
        }
      }
    }
  }, [scan]);

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
          {
            !pleaseWaitLoading ?
              <Box sx={border}>
                <Loading/>
                <h3 className="m-0 font-weight-bolder text-grey text-center">{barcodeScan ? 'Put the object in the jig' : 'Please scan the barcode' }</h3>
                {
                  btnProccedJig ?
                    <div className='d-flex justify-content-center w-100' style={{ marginTop: '40px' }}>
                    <Button onClick={handleProccess} className="font-weight-bolder box-shadow-1 bg-primary" variant="contained" type="submit" style={{ height: '48px', borderRadius: '8px', }}>Procced</Button>
                  </div>
                  : ''
                }
                <div className='d-flex justify-content-center w-100 mt-2' >
                  <Button onClick={handleClosed} className="bg-white text-grey font-weight-bolder box-shadow-1" variant="contained" type="submit" style={{ height: '48px', borderRadius: '8px', }}>Cancel</Button>
                </div>
              </Box>
              : finishedProccess ?
              <div>
                <Box sx={border} className="border-light">
                  <div className="border-bottom-primary">
                    <h3 className="text-center text-primary font-weight-bolder ">Scanning Finished</h3>
                  </div>
                  <div className="pr-3 pl-3 pt-3">
                    <Grid 
                      container
                      alignItems="start"
                      justifyContent="center"
                      className="mt-2"
                      >
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">Operator name</h5>
                      </Grid>
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">: {operator.fullName}</h5>
                      </Grid>
                    </Grid>
                    <Grid 
                      container
                      alignItems="start"
                      justifyContent="center"
                      className="mt-2"
                      >
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">Model name</h5>
                      </Grid>
                      <Grid item xs={6}>
                          <h5 className="m-0 font-weight-light text-grey">: {productDetail.qrCode}</h5>
                      </Grid>
                    </Grid>
                    <Grid 
                      container
                      alignItems="start"
                      justifyContent="center"
                      className="mt-2"
                      >
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">No. Shot</h5>
                      </Grid>
                      <Grid item xs={6}>
                          <h5 className="m-0 font-weight-light text-grey">: {productDetail.numberShotMachine}</h5>
                      </Grid>
                    </Grid>
                    <Grid 
                      container
                      alignItems="start"
                      justifyContent="center"
                      className="mt-2"
                      >
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">Time</h5>
                      </Grid>
                      <Grid item xs={6}>
                          <h5 className="m-0 font-weight-light text-grey">: {productDetail.prodDate}/{productDetail.prodMonth}/{productDetail.prodYear}</h5>
                      </Grid>
                    </Grid>
                    <Grid 
                      container
                      alignItems="start"
                      justifyContent="center"
                      className="mt-2"
                      >
                      <Grid item xs={6}>
                        <h5 className="m-0 font-weight-light text-grey">{productDetail.status=='ok' ? 'Status' : 'Temuan'}</h5>
                      </Grid>
                      <Grid item xs={6}>
                          <h5 className="m-0 font-weight-light text-grey">: {productDetail.status == 'ok' ? 'OK' : productDetail.status}</h5>
                      </Grid>
                    </Grid>
                  </div>
                  {/* <div className="d-flex justify-content-around pt-3">
                    <h5 className="m-0 font-weight-light text-grey">Operator name</h5>
                    <h5 style={{maxWidth: '120px'}} className="m-0 font-weight-light text-grey">: Jhone Doe fjklsndfkls nfklsdnflskd flkdnslfks fkldsnfkl</h5>
                  </div>
                  <div className="d-flex justify-content-around pt-3">
                    <h5 className="m-0 font-weight-light text-grey">Model name</h5>
                    <h5 style={{maxWidth: '120px'}} className="m-0 font-weight-light text-grey">: ABCDE</h5>
                  </div>
                  <div className="d-flex justify-content-around pt-3">
                    <h5 className="m-0 font-weight-light text-grey">Operator name</h5>
                    <h5 style={{maxWidth: '120px'}} className="m-0 font-weight-light text-grey">: Jhone Doe fjklsndfkls nfklsdnflskd flkdnslfks fkldsnfkl</h5>
                  </div> */}
                </Box>
                <div className='d-flex justify-content-center mt-6'>
                  <img
                    src={CheckFinished}
                    alt="Yamaha Crack"
                    loading="lazy"
                    />
                </div>
              </div>
                : <Box sx={border}>
                  <Loading />
                  <h3 className="m-0 font-weight-bolder text-grey text-center">Please Wait</h3>
                </Box>
            }
        </Grid>
      </Grid>
    </div>
  );
}

export default Inspection;