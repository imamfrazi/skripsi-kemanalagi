import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import {Toolbar, Typography, IconButton, Avatar, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbar({openDrawer}) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    openDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    openDrawer(false);
  };

  return (
      <AppBar position="fixed" open={open}>
        <Toolbar className="d-flex justify-content-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            edge="start"
            sx={{ mr: 2 }}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Big Engine Crack Detection
          </Typography>
          <Box className="d-flex">
            <Avatar sx={{ bgcolor: 'black' }}>OP</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
