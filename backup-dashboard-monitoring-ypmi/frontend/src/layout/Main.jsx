import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate, Outlet } from 'react-router-dom';

import Sidebar from './Sidebar'
import YamahaLogoNoText from '../assets/yamaha-logo-no-text.svg'

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '104px !important',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#ffffff',
  color:'black',
  boxShadow: '0px 1px 1px 0px rgb(0 0 0 / 20%)',
  width: `calc(100% - 104px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    backgroundColor: '#ffffff',
    color:'black',
    boxShadow: '0px 1px 1px 0px rgb(0 0 0 / 20%)',
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open, opendelete }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ".MuiListItemButton-root": {
      borderRadius: "4px !important"
    },
    ".Mui-selected": {
      backgroundColor: "red !important",
      "& > div" :{
        color: "#ffffff !important",
        "& > span" :{
          color: "#ffffff !important"
        }
      }
    },
    ...(opendelete && {
      '& .MuiPaper-root': {
        top:'60px',
      },
    }),
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({openAutoDelete}) {
  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    localStorage.clear()
    navigate('/login')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{
    setOpenDelete(openAutoDelete)
  },[openAutoDelete])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ height: '88px !important', top: openAutoDelete ? '50px' : '0px' }}>
        <Toolbar className="d-flex justify-content-end"  sx={{ height: '100%'}}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            edge="start"
          >
            <MenuIcon />
          </IconButton> */}
          <Box className="d-flex"><div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={YamahaLogoNoText}></Avatar>
              {/* <AccountCircle /> */}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} opendelete={openDelete ? openDelete.toString() : undefined} >
        <Sidebar open={open}/>
      </Drawer>
      <Box component="main" className="vh-min-100 bg-grey-4" sx={{ flexGrow: 1, p: 3, paddingTop:'120px'}}>
        <Outlet />
      </Box>
    </Box>
  );
}
