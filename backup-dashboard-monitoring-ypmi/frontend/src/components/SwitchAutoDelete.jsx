import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

//Utils
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
//Api
import { productAutoDelete } from '../Api/product'

const DangerSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FF0202',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FF0202',
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function SwitchAutoDelete({handleAlertAutoDelete}) {
  const [statusAutoDelete, setStatusAutoDelete] = React.useState(true)
  React.useEffect(() => {
    let systemStatus = getLocalStorage('user').isDelete
    setStatusAutoDelete(systemStatus != "" ? systemStatus : false)
  }, [])

  const handleSwitch = async(event) => {
    try {
      let body = {
        userId: getLocalStorage('user').id,
        isDelete: event.target.checked
      }
      setStatusAutoDelete(body.isDelete)
      let user = getLocalStorage('user')
      user.isDelete = body.isDelete
      setLocalStorage('user', user)
      let response = await productAutoDelete(body)
      handleAlertAutoDelete({ open: true, message: "Successfully to set auto delete", severityStatus:'success'})
    } catch (error) {
      console.log(error.response.data.message)
      handleAlertAutoDelete({ open: true, message: "Failed to set auto delete", severityStatus:'danger'})
    }
  }
  return (
    <div>
      <DangerSwitch {...label} onChange={handleSwitch} checked={statusAutoDelete} />
    </div>
  );
}