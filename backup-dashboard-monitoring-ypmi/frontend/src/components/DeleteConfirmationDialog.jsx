import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

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
  '& .MuiPaper-rounded': {
    borderRadius: '16px !important'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 16px 0px 16px',
  },
  '& .MuiOutlinedInput-root': {
    'input': {
      border: '0px solid white !important'
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

export default function DeleteConfirmationDialog({ open, closedModal, callbackConfirmation, messageDelete }) {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closedModal(false)
    }
  }
  const handleConfirmation = async () => {
    try {
      callbackConfirmation()
    } catch (error) {
      alert("Tidak dapat matikan system, Hubungi Admin")
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
        <DialogContent className='ml-6 mr-6 mt-5 mb-4 pt-3'>
          <Box>
            <h4 className="m-0 font-weight-bolder"> {messageDelete} </h4>
          </Box>
        </DialogContent>
        <DialogActions className='mt-2 pb-3 ml-5 mr-5 d-flex justify-content-end'>
          <Button autoFocus onClick={handleClose} className="text-grey font-weight-bolder bg-white" variant="contained" type="submit" sx={{ borderRadius: '8px', height: '44px', width: '104px' }}>close</Button>
          <Button onClick={handleConfirmation} className="bg-primary font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px', width: '104px' }}>Save</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
