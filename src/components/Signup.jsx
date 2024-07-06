// import React from 'react'
import React, { useState } from 'react';
import { TextField, Button, Container, Typography,  MenuItem, FormControl, InputLabel, Select , CssBaseline, Grid, Stack, Avatar, Link, Box} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { useDispatch, useSelector } from 'react-redux';
// import { validateSignup } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { register } from '../features/user/authSlice';
// import { CompressOutlined } from '@mui/icons-material';
// import { lightGreen } from '@mui/material/colors';

function Signup() {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailError = useSelector((state) => state.user.emailError);
  const passwordError = useSelector((state) => state.user.passwordError);
  const confirmPasswordError = useSelector((state) => state.user.confirmPasswordError);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };
  const handleLoginRedirect = () => {
    navigate('/login');
  };
  const handleSignupRedirect = () => {
    console.log('register', firstName, lastName, email, password)
    dispatch(register({ email, password, confirmPassword })).then(action => {localStorage.setItem('accessToken', action.payload.id)});
    if(localStorage.getItem("auth_token")) {
      navigate('/home')
    
  }};


  return (   
      <Container component='main' maxWidth='sm' align='center'>
        <CssBaseline>
      <form className="bg-white rounded-lg shadow-lg p-20 w-full " onSubmit={handleSubmit}>
        <Box align='center' sx={{mb: 2 }}>
          <Avatar className=' bg-blue-500'>
          <LockTwoToneIcon/>
         </Avatar>
        </Box>
      <Typography component="h1" variant="h4" align='center' className="mb-8 font-semibold">Signup</Typography>
        <Stack spacing={2} direction="row" sx={{marginBottom: 1}}>
        <TextField
        className='w-1/2 m-1'
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
        className='w-1/2 m-1'
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        </Stack>
        <TextField
          className='p-1'
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
          required
          margin="normal"
          sx={{mb: 3 }}
        />
        <Stack spacing={2} direction="row" sx={{marginBottom: 1}}>
        <TextField
        className='w-1/2 m-1'
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          margin="normal"
        />
        <TextField
         className='w-1/2 m-1'
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          margin="normal"
          sx={{mb: 3 }}
        />
        </Stack>
        <Stack spacing={0.5} direction="row" sx={{marginBottom: 1 , marginTop:3}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className='w-1/2 m-1'
            label="Date of Birth"
            value={dob}
            onChange={setDob}
            margin="normal"
          />
        </LocalizationProvider>
        <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name=""
              label="Gender"
              margin='normal'
              sx={{mb: 3, marginY : 0.5 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
        </FormControl>
        </Stack>
        <div className='flex justify-center py-4'>
        <Button type="submit" variant="contained"  size='medium' className='w-1/2 rounded-md bg-indigo-600 text-sm font-semibold text-white leading-6 shadow-sm hover:bg-indigo-300'   onClick={handleSignupRedirect}>
        Signup
        </Button>
        </div>
         <Grid container justifyContent="flex-end">
            <Grid item>
            <Link className='text-blue-500 hover:underline my-4' component="button" variant="body2" onClick={handleLoginRedirect}>
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
      </form>
      <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/home">
        Socialify
      </Link>
    </Typography>
      </Box>
      </CssBaseline>
    </Container>
  )
}

export default Signup
