import * as React from 'react'
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HistoryImageTable from '../components/HistoryImageTable'
//select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';

//Api
import { operatorListApi } from '../Api/user'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '4px',
  boxShadow: 'none !important',
  '& .date-time':{
    [theme.breakpoints.down('lg')]: {
      marginTop: '24px',
    },
    '& .MuiOutlinedInput-root':{
      background: '#EEEFF4',
    }
  },
  '& .operator':{
    [theme.breakpoints.down('lg')]: {
      paddingRight: '8px',
    },
    '& .MuiSelect-select':{
      background: '#EEEFF4 !important',
      borderRadius: '8px',
      border: 'none'
    }
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #EEEFF4 !important',
  textAlign: 'start',

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100% !important',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
// const Select = styled('div')(() => ({
//   '& > label':{
//     fontWeight: 400,
//     fontSize: '16px',
//   },
//   '& > select':{
//     background: '#EEEFF4',
//     height: '37px',
//     borderRadius: '8px',
//     padding: '4px 8px',
//     border: 'none !important',
//     color: '#474A57',
//     fontWeight: '400',
//     fontSize: '16px',
//   }
// }));



function History() {
  const [choosenDate, setChoosenDate] = React.useState('-');
  const [operator, setOperator] = React.useState('-');
  const [operatorOptions, setOperatorOptions] = React.useState([])
  const [searchImage, setSearchImage] = React.useState('')
  const handleSearchOperatorName = (event) => {
    console.log(event.target.value)
    setOperator(event.target.value)
  };
  const handleResetTable = () =>{
    setSearchImage('')
    setChoosenDate('-')
  }
  // Method for hit api
  const receiveOperatorList = async () => {
    try {
      let response = await operatorListApi()
      setOperatorOptions(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    receiveOperatorList()
  }, []);
  return (
    <>
      <Box className='mt-5'>
        <h3 className='m-0 mt-5 mb-5 font-weight-bolder'>History</h3>
        <Grid container  className="h-100">
          <Grid item xs={12}>
            <Item className='pt-3'>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={4}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search Model Name"
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchImage}
                      onChange={(e)=>setSearchImage(e.target.value)}
                      />
                  </Search>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    justifyContent="end"
                    alignItems='center'
                  >
                    <Grid xs={6} md={12} lg={6} item className="date-time pr-1 d-flex align-items-center" sx={{marginLeft:'auto'}}>
                      {/* <Select>
                        <label className='mr-1'>Date Time:</label>
                        <select name="operator" id="operator">
                          { operatorOptions.map((item)=>(
                            <option key={item.id} value={item.id}>{new Date().toLocaleDateString('en-IN')}</option>
                            ))}
                        </select>
                      </Select> */}
                      <label className='mr-2'>Date time:</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ background: '#EEEFF4 !important' }}
                          value={choosenDate}
                          onChange={(newValue) => {
                            setChoosenDate(newValue);
                          }}
                          inputFormat="DD/MM/YYYY"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    {/* <Grid xs={6} md={12} lg={6} item className="operator d-flex align-items-center">
                      <label className='mr-2'>Reset Filter:</label>
                      <RestartAltIcon onClick={handleResetTable} />
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className='mt-3'>
                <Grid item xs={12}>
                  <HistoryImageTable search={searchImage} operatorId={operator} choosenDate={choosenDate}/>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default History