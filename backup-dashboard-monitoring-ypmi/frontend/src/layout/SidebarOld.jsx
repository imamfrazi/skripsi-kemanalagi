import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function Sidebar() {
  const navigate = useNavigate();
  const menu = [
    {
      name: 'Home',
      onClick: () => navigate("/")
    },
    {
      name: 'History',
      onClick: () => navigate("/about")
    },
    {
      name: 'Setting',
      onClick: () => navigate("/about")
    },
  ]
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <DrawerHeader className='d-flex justify-content-center'>
        Big Engine Crack Detection
      </DrawerHeader>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <ListItem button onClick={item.onClick} key={item.name} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  )
}