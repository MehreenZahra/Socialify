
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../features/user/profileSlice';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Typography,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const EditProfile = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);


  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!userData.firstName || !userData.lastName || !userData.dob) {
      setError('All fields are required');
      return;
    }
    dispatch(updateProfile(userData));
    localStorage.setItem('currentUser', JSON.stringify(userData));
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUser = users.find((user) => user.userId === userData.userId);
    if (updatedUser) {
    updatedUser.firstName = userData.firstName;
    updatedUser.lastName = userData.lastName;
    updatedUser.email= userData.email;
    updatedUser.dob=userData.dob;
  // Update other fields as needed...
    localStorage.setItem('users', JSON.stringify(users));
  }
    setError(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth='sm' align='center'>
      {/* <Box sx={{ mb: 2 }} flex={4} p={2} >
        <Typography variant="h2">Edit Profile</Typography>
      </Box> */}
      <form className="bg-white rounded-lg shadow-lg p-20 w-md" onSubmit={handleUpdateProfile}>
      <Box sx={{ mb: 2 }} flex={4} p={2} >
        <Typography className="mb-8 font-semibold" variant="h2">Edit Profile</Typography>
      </Box>
      <FormControl fullWidth sx={{ mb: 2 }}>
          
          <TextField
          id="email"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            label="Email"
          />
        </FormControl>
        <br /> 
        <FormControl fullWidth sx={{ mb: 2 }}>
          
          <TextField
          id="firstName"
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            label="First Name"
          />
        </FormControl>
        <br />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            label="Last Name"
          />
        </FormControl>
        <br />
        <FormControl fullWidth sx={{ mb: 2 }}>
        
          {/* <TextField
            type="date"
            name="dob"
            value={userData.dob}
            // onChange={handleInputChange}
            onChange={(event) => {
              setUserData({ ...userData, dob: event.target.value })}}
            label="DOB"
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
           label="Date of Birth"
           value={dayjs(userData.dob)}
           onChange={(newValue) => {
            setUserData({ ...userData, dob: newValue });
          }}
          slots={{ textField: TextField }}
        />
        </LocalizationProvider>
        </FormControl>
        <br />
        {error && (
          <FormHelperText error>
            {error}
          </FormHelperText>
        )}
        <Button type="submit" variant="contained">
          Update Profile
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">Profile edited successfully!</Alert>
      </Snackbar>
      </form>
    </Container>
  );
};

export default EditProfile;