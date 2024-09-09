import React, { useState } from 'react';
import {  Button, Container, Typography, FormControl,  CssBaseline,  Stack, Avatar, Link, Box } from '@mui/material';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../store/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import CustomInput from './textInputs/CustomInput';
import CustomSelect from './textInputs/CustomSelect';

function Signup() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !firstName) {
      setError('All fields are required');
      return;
    } else if (password !== confirmPassword) {
      setError('Password donot match');
      return;
    }
    const existingUser = JSON.parse(localStorage.getItem('users')).find((user) => user.email === email);

    if (existingUser) {
      setError('Email already registered');
      return;
    }
    const userId = nanoid();
    const role = firstName.toLowerCase() === 'admin' ? 'admin' : 'user';
    dispatch(signup({ email, password, firstName, lastName, dob, userId, gender, role }));
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };
  const handleLoginRedirect = () => {
    navigate("/");
  };
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <Box className="mt-8 mx-auto max-w-md">
        <form className="bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
          <Box className="flex flex-col items-center mb-6">
            <Avatar className="bg-blue-500 mb-2">
              <LockTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h4" className="font-semibold">
              Signup
            </Typography>
          </Box>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <CustomInput
                className='w-1/2'
                label="First Name"
                helperText={'Start with Capital letter'}
                value={firstName}
                onChange={(e) => setFirstName(e)}
                fullWidth
              />
              <CustomInput
                className='w-1/2'
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e)}
                fullWidth
              />
            </Stack>
            <CustomInput
              required
              label="Email"
              value={email}
              onChange={(e) => setEmail(e)}
              fullWidth
            />
            <Stack direction="row" spacing={2}>
              <CustomInput
                required
                className='w-1/2 pr-8' // Added pr-8 for padding-right
                label="Password"
                type='password'
                value={password}
                onChange={(e) => setPassword(e)}
                iconClassName="right-5" // New prop for icon positioning
              />
              <CustomInput
                required
                className='w-1/2 pr-8' // Added pr-8 for padding-right
                label="Confirm Password"
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e)}
                iconClassName="right-5" // New prop for icon positioning
              />
            </Stack>
            <CustomInput
              className='w-1/2'
              type="date"
              label="Date of Birth"
              onChange={(value) => {
                if (value) {
                  const selectedDate = new Date(value);
                  const formattedDob = selectedDate.toISOString();
                  setDob(formattedDob);
                }
              }}
              placeholder="dd/mm/yyyy"
            />
            <FormControl className='w-1/2'>
              <CustomSelect
                label="Gender"
                type='Gender'
                value={gender}
                onChange={(e) => setGender(e)}
                options={genderOptions}
                fullWidth
                className='align-center'
              />
            </FormControl>
          </Stack>
          {error && <Typography color="error" className="text-center mt-2">{error}</Typography>}
          <Box className="mt-6 flex justify-center">
            <Button
              type="submit"
              variant="contained"
              size='large'
              className='w-full rounded-md bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-500'
              onClick={handleSubmit}
            >
              Signup
            </Button>
          </Box>
          <Box className="mt-4 text-center">
            <Link
              className='text-blue-500 hover:underline'
              component="button"
              variant="body2"
              onClick={handleLoginRedirect}
            >
              Already have an account? Log in
            </Link>
          </Box>
        </form>
      </Box>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="/home">
            Socialify
          </Link>
          {' '}
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  )
}

export default Signup
