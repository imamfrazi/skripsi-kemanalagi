import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button, FormControl, IconButton, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import YamahaLogo from '../assets/yamaha-logo.svg'
import { setLocalStorage } from '../utils/localStorage'

/* Api */
import {signIn} from '../Api/user'

const border = {
  padding: '40px 24px',
  border: '1px solid white',
  borderRadius: '16px',
  minHeight: '300px',
  color: 'black',
  backgroundColor: 'white'
}
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleLogin = async (e) =>{
    try {
      
      e.preventDefault();
      setErrorMessage('')
      let body = {
        email,
        password
      }
      signIn(body).then((response)=>{
        setLocalStorage('user', response.data)
        setTimeout(() => {
          window.location.href = '/'
        }, 500);

      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className='w-100 h-100 bg-grey-4'>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        className='vh-min-100'
        >
        <Grid item lg={6} style={{maxWidth:'432px'}}>
          <Box sx={border}>
            <div className="border-bottom-light mb-4 text-grey">
              <div className='d-flex justify-content-center'>
                <img
                  src={YamahaLogo}
                  alt="Yamaha Crack"
                  loading="lazy"
                  />
              </div>
              <h3 className='font-weight-bolder text-center'>Crack Detection Dashboard</h3>
            </div>
            <form className='py-3 px-2' onSubmit={handleLogin}>
              <FormControl className="w-100">
                <TextField sx={{ marginBottom: '20px' }} id="email" label="Email" onChange={e => setEmail(e.target.value)} variant="outlined" type="email" />
              </FormControl>
              <FormControl className="w-100" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  label="Password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className='d-flex justify-content-center'>
                  <p className='m-0 mt-2 font-weight-bolder text-primary'>
                    {errorMessage}
                  </p>
              </div>
              <div className="mt-6">
                <Button className="w-100 bg-primary font-weight-bolder" variant="contained" type="submit" style={{height: '44px'}}>Log in</Button>
              </div>
            </form>
          </Box>
        </Grid>
      </Grid> 
    </div>
  );
}

export default Login;