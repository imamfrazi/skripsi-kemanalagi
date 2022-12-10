import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

//Api
import { signUpApi, updateUserApi } from '../Api/user' 

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  borderRadius:'8px',
  'input':{
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

export default function AddOperatorDialog({ open, closedModal, updateOperator, statusModal, dataModal }) {
  const [operatorFirstName, setOperatorFirstName] = React.useState('')
  const [operatorLastName, setOperatorLastName] = React.useState('')
  const [operatorId, setOperatorId] = React.useState('')
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closedModal(false)
    }
  }
  const handleSave = async() => {
    try{
      let body = {
        firstName: operatorFirstName,
        lastName: operatorLastName
      }
      let response = await signUpApi(body)
      setOperatorFirstName('')
      setOperatorLastName('')
    }catch(error){
      alert("Tidak dapat tambah user, Hubungi Admin")
    }
    updateOperator()
  }
  const handleUpdate = async() => {
    try{
      let body = {
        firstName: operatorFirstName,
        lastName: operatorLastName,
        id: operatorId,
      }
      let response = await updateUserApi(body)
    }catch(error){
      alert("Tidak dapat Update user, Hubungi Admin")
    }
    updateOperator()
  }
  React.useEffect(() => {
    if(statusModal == 'update'){
      setOperatorFirstName(dataModal.firstName ? dataModal.firstName : '')
      setOperatorLastName(dataModal.lastName ? dataModal.lastName : '')
      setOperatorId(dataModal.id ? dataModal.id : '')
    }
  }, [dataModal])

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" className="pt-5" >
          <div>
            <h3 className="m-0 font-weight-bolder text-center">{statusModal == 'update' ? 'Update New Operator' : 'Add New Operator' } </h3>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers className='ml-6 mr-6 mt-5 mb-4'>
          <input type="text"  value={operatorFirstName} onChange={e => setOperatorFirstName(e.target.value)} className='w-100' id="outlined-basic" placeholder='First Name' />
          <input type="text"  value={operatorLastName} onChange={e => setOperatorLastName(e.target.value)} className='w-100 mt-2' id="outlined-basic" placeholder='Last Name' />
        </DialogContent>
        <DialogActions className='mt-2 pb-3 ml-5 mr-5 d-flex justify-content-end'>
          <Button autoFocus onClick={handleClose} className="text-grey font-weight-bolder bg-white" variant="contained" type="submit" sx={{ borderRadius: '8px', height: '44px' }}>close</Button>
          {
            statusModal == 'update' ?
              <Button onClick={handleUpdate} className="bg-primary font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px' }}>Update</Button>
            :
              <Button onClick={handleSave} className="bg-primary font-weight-bolder" variant="contained" type="submit" sx={{ height: '44px' }}>Add</Button>
          }
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
