import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  pt: 4,
  px: 2,
  pb: 2,
};

const customColor = (status) => {
  switch (status.toLowerCase()) {
    case 'good':
      return '#3ACBE9 !important'
    case 'not good':
      return '#FF5942 !important'
    case 'disposition':
      return '#F4C427 !important'
    default:
      return '#3ACBE9 !important'
  }
}

const controlProps = (item) => ({
  value: item,
  name: 'color-radio-button-demo',
  inputProps: { 'aria-label': item },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: '8px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  border: '1px solid #D9DBE1',
  borderRadius: '0px'
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (<>{children}</>)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function NoProductDialog() {
  const navigate = useNavigate()
  const [openNestedModal, setOpenNestedModal] = React.useState(true)
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick'){
      setOpenNestedModal(false)
      navigate('/inspection')
    }
  };
  
  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={openNestedModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2>
              No Product Being Scanned
          </h2>
          <div className='d-flex'>
            <Button onClick={handleClose} className=" w-100 bg-primary font-weight-bolder" variant="contained" style={{ height: '44px' }}>Close</Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}