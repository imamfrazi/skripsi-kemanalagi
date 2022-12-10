import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

//API
import { productDirectorySize } from '../Api/product'
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FF0202 !important',
  },
}));


export default function StorageLimitProgress() {
  const [progress,setProgress] = React.useState(0)
  const [sizeProgress,setSizeProgress] = React.useState(0)
  const maxSize = 1024 * 1024 * 1024 * 128
  const convertSizeFormat = (size) => {
    if (size >= 1024) {
      const kbInbytes = 1024
      const mbInbytes = kbInbytes * 1024
      const gbInbytes = mbInbytes * 1024
      if (size >= gbInbytes) {
        return `${Math.round(size / gbInbytes)}GB`
      } else if (size >= mbInbytes) {
        return `${Math.round(size / mbInbytes)}MB`
      }
      return `${Math.round(size / kbInbytes)}KB`
    }
    return `${size}Bytes`
  }
  //methods hit api
  const receiveProductDirectorySize = async()=>{
    try{
      let response = await productDirectorySize()
      let size = response.data.size.scanImg + response.data.size.aiImg
      setSizeProgress(size)
      setProgress((Number(size)/maxSize)*100)
    }catch(e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    receiveProductDirectorySize()
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <p className='m-0'>{convertSizeFormat(Number(sizeProgress))}/128GB Used</p>
      <BorderLinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
