import React, { useState } from 'react';
import { TextField, Button, Container, Typography,  MenuItem, FormControl, InputLabel, Select , CssBaseline, Grid, Stack, Avatar, Link, Box} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/user/userSlice';
import { nanoid } from '@reduxjs/toolkit';

function Signup() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState ('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender , setGender] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError]= useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !firstName){
      setError ('All fields are required');
      return;
    } else if (password !== confirmPassword){
      setError ('Password donot match')
      return;
    }
    const userId = nanoid();
    const role = firstName.toLowerCase() === 'admin' ? 'admin' : 'user'; 
    dispatch(signup({ email, password, firstName, lastName, dob,userId ,gender,role}))
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };
  const handleLoginRedirect = () => {
        navigate("/");
       };
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
          helperText={'Your name must start with Capital letter'}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="none"
        />
        <TextField
        className='w-1/2 m-1'
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="none"
        />
        </Stack>
        <TextField
          Required
          className='p-1'
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="none"
          sx={{mb: 3 }}
        />
        <Stack spacing={2} direction="row" sx={{marginBottom: 1}}>
        <TextField
         Required
        className='w-1/2 m-1'
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="none"
        />
        <TextField
         Required
         className='w-1/2 m-1'
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="none"
          sx={{mb: 3 }}
        />
        </Stack>
        <Stack spacing={0.5} direction="row" sx={{marginBottom: 1 , marginTop:3}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className='w-1/2 m-1'
            label="Date of Birth"
            // value={dobDateObject} 
            onChange={(newValue) => {
              const dobDateObject = newValue;
              const formattedDob = dobDateObject.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
              setDob(formattedDob);}}
            margin="none"
          />
        </LocalizationProvider>
        <FormControl variant="outlined"  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={gender}
              label="Gender"
              margin='none'
              sx={{mb: 3, marginY : 0.5 }}
              onChange={(e) => setGender(e.target.value)} 
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
        </FormControl>
        </Stack>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='flex justify-center py-4'>
        <Button type="submit" variant="contained"  size='medium' className='w-1/2 rounded-md bg-indigo-600 text-sm font-semibold text-white leading-6 shadow-sm hover:bg-indigo-300'   onClick={handleSubmit}>
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
