import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
//component
import CheckHistoryTable from './CheckHistoryTable'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

export default function HistoryJudgmentDialog({ open, closedModal, productId }) {
  const navigate = useNavigate()
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closedModal(false)
    }
  }
  
  //////////////////////

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
          <div>
            <h5 className="m-0 font-weight-bolder">Judgement History</h5>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <CheckHistoryTable productId={productId}/> 
        </DialogContent>
        <DialogActions className='mt-2 pb-3 d-flex justify-content-end'>
          <Button autoFocus onClick={handleClose} className=" text-white bg-primary" variant="contained" type="submit" style={{ borderRadius: '8px', }}>close</Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
