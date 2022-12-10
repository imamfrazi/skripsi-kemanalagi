import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home';

import YamahaLogoNoText from '../assets/yamaha-logo-no-text.svg'
import YamahaLogo from '../assets/yamaha-logo.svg'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '88px',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function Sidebar({open}){
  const navigate = useNavigate();
  const menu = [
    {
      name: 'Home',
      onClick:()=>navigate("/"),
      icon: <HomeIcon/>
    },
    {
      name: 'History',
      onClick:()=>navigate("/about"),
      icon: <PendingActionsIcon/>
    },
    {
      name: 'Setting',
      onClick:()=>navigate("/setting"),
      icon: <SettingsIcon/>
    },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return(
    <>
      <DrawerHeader className={!open ? 'd-flex justify-content-center' : 'd-flex justify-content-start pl-3 pt-3 pb-2'}>
      {!open ?
          <img
            src={YamahaLogoNoText}
            alt="Yamaha Logo"
            loading="lazy"
          />
        :
        <Box>
            <img
              src={YamahaLogo}
              alt="Yamaha Logo"
              loading="lazy"
              width="100"
              height="24"
            />
            <p className='m-0 font-weight-bolder'>Crack Detection Dashboard</p>
        </Box>
      }
    </DrawerHeader>
    <Divider />
      <List className={open ? 'ml-3 mr-3':'pr-3 pl-15'}>
      {menu.map((item, index) => (
        <ListItem button onClick={item.onClick} key={item.name} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: open ? 3 : 5,
            }}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: '#969BAB',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: '#969BAB' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    </>
  )
}