import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../features/user/profileSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Snackbar,
} from '@mui/material';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);


//   const handleChangePassword = (event) => {
//     event.preventDefault();
//     if (newPassword !== confirmNewPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     dispatch(updatePassword({ currentPassword, newPassword }));
//     // localStorage.setItem('currentUser', JSON.stringify(userData));
//     // const users = JSON.parse(localStorage.getItem('users'));
//     // const updatedUser = users.find((user) => user.userId === userData.userId);
//     // if (updatedUser) {
//     // updatedUser.password = userData.password;
//     // localStorage.setItem('users', JSON.stringify(users));
//     setError(null);
//   };
const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    dispatch(updatePassword(currentPassword,newPassword));
    localStorage.setItem('currentUser', JSON.stringify({ ...userData, password: newPassword }));
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUser = users.find((user) => user.userId === userData.userId);
    if (updatedUser) {
      updatedUser.password = newPassword;
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
    <form className="bg-white rounded-lg shadow-lg p-20 w-md" onSubmit={handleUpdatePassword}>
    <Box
     
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Typography className="mb-8 font-semibold"  variant="h4">Change Password</Typography>
      
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
      />
      
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(event) => setConfirmNewPassword(event.target.value)}
      />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button type="submit" variant="contained" sx={{ mt: 2 }} >
        Change Password
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">Password changed successfully!</Alert>
      </Snackbar>
    </Box>
    </form>
    </Container>
  );
};

export default ChangePassword;