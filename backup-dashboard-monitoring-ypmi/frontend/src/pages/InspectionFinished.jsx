import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import CheckFinished from '../assets/check-finished.svg'

//Utils
import { setLocalStorage, getLocalStorage } from "../utils/localStorage";

// API
import { productDeleteImagesApi } from '../Api/product'

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
function InspectionFinished() {
  const navigate = useNavigate()
  const [productDetail, setProductDetail] = useState({})

  //method hit endpoint 
  const receiveProductDetail = async () => {
    try {
      let QRCode = {}
      if (getLocalStorage('qrCode')) {
        QRCode = getLocalStorage('qrCode')
      }
      let operatorLocalStorage = []
      if (getLocalStorage('operator')) {
        operatorLocalStorage = getLocalStorage('operator')
      }
      let product = getLocalStorage('productDetail')
      console.log(product, "ini product")
      setProductDetail(product)
      let timeSetting = getLocalStorage('timeSetting')
      let res = await productDeleteImagesApi({})
      if(getLocalStorage('refreshLimit')){
        setLocalStorage('refreshLimit', { data: getLocalStorage('refreshLimit').data + 1, status:product.status })
      }else{
        setLocalStorage('refreshLimit', { data:1, status:product.status })
      }
      setTimeout(() => {
        // add condition when product detail status universal ok then system will skipp liveCheckImageDialog
        if (product.status != "good") {
          navigate('/', {
            state: {
              crack: true,
              barcode: QRCode.data.qrCode,
              productDetail: {}
            }
          });
        } else {
            navigate('/inspection');
        }
        setLocalStorage('productDetail', {})
      }, timeSetting.outputRedirectTime);
    } catch (error) {
      alert(error.response.data)
    }
  }
  useEffect(() => {
    receiveProductDetail()
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
                    <h5 className="m-0 font-weight-light text-grey">: {productDetail.user ? productDetail.user.firstName : ''} {productDetail.user ? productDetail.user.lastName : ''}</h5>
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
                    <h5 className="m-0 font-weight-light text-grey">: {productDetail.noShot}</h5>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="start"
                  justifyContent="center"
                  className="mt-2"
                >
                  <Grid item xs={6}>
                    <h5 className="m-0 font-weight-light text-grey">No.shot</h5>
                  </Grid>
                  <Grid item xs={6}>
                    <h5 className="m-0 font-weight-light text-grey">: {productDetail.noShot}{productDetail.qrCode}</h5>
                  </Grid>
                </Grid>
                {/* <Grid
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
                </Grid> */}
                <Grid
                  container
                  alignItems="start"
                  justifyContent="center"
                  className="mt-2"
                >
                  <Grid item xs={6}>
                    <h5 className="m-0 font-weight-light text-grey">{productDetail.status == 'good' ? 'Status' : 'Temuan'}</h5>
                  </Grid>
                  <Grid item xs={6}>
                    <h5 className="m-0 font-weight-light text-grey">: {productDetail.status == 'good' ? 'Good' : productDetail.status}</h5>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default InspectionFinished;