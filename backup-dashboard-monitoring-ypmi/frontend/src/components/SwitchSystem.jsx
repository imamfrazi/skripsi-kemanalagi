// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Switch from '@mui/material/Switch';

// //component
// import AiJudgmentDialog  from "./AiJudgmentDialog";

// const DangerSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase.Mui-checked': {
//     color: '#FF0202',
//   },
//   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//     backgroundColor: '#FF0202',
//   },
// }));

// const label = { inputProps: { 'aria-label': 'Color switch demo' } };

// export default function SwitchSystem() {
//   const [statusAi, setStatusAi] = React.useState(true)
//   const [modal, setModal] = React.useState(false)

//   const handleSwitch = (event)=>{
//     if(event.target.checked){
//       setStatusAi(true)
//       localStorage.setItem('system_status', JSON.stringify({status:true}))
//     }else{
//       setModal(true)
//     }
//   }
//   const handleClosedModal = async () => {
//     setModal(false)
//   }
//   const handleSaveClosedModal = async () => {
//     localStorage.setItem('system_status', JSON.stringify({status:false}))
//     setModal(false)
//     setStatusAi(false)
//   }
//   React.useEffect(()=>{
//     if(localStorage.getItem('system_status')){
//       let systemStatus = JSON.parse(localStorage.getItem('system_status')).status
//       setStatusAi(systemStatus)
//     }
//   }, [])
//   return (
//     <div>
//       <DangerSwitch {...label} onChange={handleSwitch} checked={statusAi}/>
//       <AiJudgmentDialog open={modal} closedModal={handleClosedModal} saveClosedModal={handleSaveClosedModal}/>
//     </div>
//   );
// }
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

//component
import AiJudgmentDialog  from "./AiJudgmentDialog";

//utils
import {setLocalStorage, getLocalStorage} from '../utils/localStorage'

const DangerSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#FF0202',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FF0202',
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function SwitchSystem({handleDisabledBtnInspection}) {
  const [statusAi, setStatusAi] = React.useState(true)
  const [modal, setModal] = React.useState(false)

  const handleSwitch = (event)=>{
    setModal(true)
  }
  const handleClosedModal = async () => {
    setModal(false)
  }
  const handleSaveClosedModal = async () => {
    let user = getLocalStorage('user')
    user.isActive = !statusAi
    setLocalStorage('user', user)

    setModal(false)
    setStatusAi((statusAi)=>!statusAi)
    handleDisabledBtnInspection(user.isActive)
  }
  React.useEffect(()=>{
    let systemStatus = getLocalStorage('user').isActive
    setStatusAi(systemStatus)
  }, [])
  return (
    <div>
      <DangerSwitch {...label} onChange={handleSwitch} checked={statusAi}/>
      <AiJudgmentDialog open={modal} closedModal={handleClosedModal} saveClosedModal={handleSaveClosedModal}/>
    </div>
  );
}