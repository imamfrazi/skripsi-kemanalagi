import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#FF0202' : '#308fe8',
  },
}));

export default function LinearProgressBars({progress, component="usually"}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant={component == 'please-wait' ? "indeterminate":"determinate"} value={Math.floor(progress)} sx={{width:'100%'}} />
    </Box>
  );
}