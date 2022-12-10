import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress() {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={200}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#FF0202' : '#308fe8'),
          animationDuration: '1500ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'linear',
          },
        }}
        size={200}
        thickness={4}
      />
    </Box>
  );
}

export default function CustomizedProgressBars() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress />
    </Box>
  );
}