import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarMessage({ openSnackbar, handleCloseSnackbar, message, severityStatus}) {
  const [vertical, setVertical] = React.useState('bottom')
  const [horizontal, setHorizontal] = React.useState('left')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseSnackbar()
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
        <Alert onClose={handleClose} severity={severityStatus} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}