import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//Api
import { deactivateSystemApi } from '../Api/user'

//Utils 
import { getLocalStorage } from '../utils/localStorage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: '8px',
  'input': {
    width: '100%',
    borderRadius: '8px',
    border: '2px solid #D9DBE1',
    fontSize: '16px',
    fontWeight: 400,
    padding: '16px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    marginLeft: '16px',
    marginRight: '16px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 16px 0px 16px',
  },
  '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    maxWidth: 'none !important',
  },
  '& .css-1xgjpwf-MuiGrid-root>.MuiGrid-item': {
    paddingLeft: '0px',
    paddingTop: '0px !important',
  },
  '& .css-18jy1ur-MuiPaper-root-MuiCard-root': {
    borderRadius: '0px !important',
  },
  '& .css-1t4vnk2-MuiDialogContent-root': {
    padding: '0px 0px !important',
  },
  '& .css-1xgjpwf-MuiGrid-root': {
    width: '100%',
    marginLeft: '0px !important',
    marginTop: '0px !important'
  },
  '& .MuiOutlinedInput-root':{
    'input':{
      border:'0px solid white !important'
    }
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
};

export default function AddOperatorDialog({ open, closedModal, saveClosedModal, statusAi }) {
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setErrorMessage('')
      setPassword('')
      closedModal(false)
    }
  }
  // hit API endpoint
  const handleDeactiveSystem = async () => {
    try {
      setErrorMessage('')
      let user = getLocalStorage('user')
      let body = {
        email: user.email,
        password: password,
        isActive: !user.isActive
      }
      let response = await deactivateSystemApi(body)
      setPassword('')
      saveClosedModal()
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-5" >
          <div>
            <h3 className="m-0 font-weight-bolder text-center"> AI Judgement (Superadmin) </h3>
          </div>
        </BootstrapDialogTitle>
        <DialogContent className='ml-6 mr-6 mt-5 mb-2 pt-3'>
          <FormControl className="w-100" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              label="Password"
              onChange={e => setPassword(e.target.value)}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <div className='d-flex justify-content-center'>
          <p className='m-0 font-weight-bolder text-primary'>
            {errorMessage}
          </p>
        </div>
        <DialogActions className='mt-2 pb-3 ml-5 mr-5 d-flex justify-content-end'>
          <Button autoFocus onClick={handleClose} className="text-grey font-weight-bolder bg-white" variant="contained" type="submit" sx={{ borderRadius: '8px', height: '44px' }}>close</Button>
          <Button onClick={handleDeactiveSystem} className="bg-primary font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px' }}>Confirm</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
