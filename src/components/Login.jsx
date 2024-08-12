import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, IconButton, Grid } from '@mui/material';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from '../features/user/userSlice'
import { Visibility, VisibilityOff } from '@mui/icons-material';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!email || !password) {
        setError('Email and password are required');
        return;
      } 
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userFound = users.find(user => user.email === email);
      if (email === 'admin@gmail.com' && password === 'admin00') {
        dispatch(login({ email, password }));
        navigate('/admin');
      } else if (userFound) {
        if (userFound.password === password && userFound.email === email) {
          dispatch(login({ email, password }));
          navigate('/home');
        } else {
          setError('Invalid password or email');
        }
      } else {
        setError('Invalid email or password');
      }
    };
  
      const handleSignupRedirect = () => {
        navigate('/signup');
      };
    
  
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
    <Grid container spacing={2} sx={{ maxWidth: '300px' }} className='flex justify-center max-h-screen '>
    <form  className='bg-white rounded-lg shadow-lg p-6'>
      <Typography variant="h2" align='center' gutterBottom style={{ fontSize: '40px', fontWeight: 'bold', color: 'blue' }} className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight'>Login</Typography>
      <Grid item xs={12}>
        <TextField
          className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 justify-center'
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          size='small'
          required
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
        className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 justify-center'
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          size='small'
          required
          sx={{ maxWidth: '100%' }}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{
                  color: showPassword ? 'blue' : 'gray',
                  position: 'absolute', // Add this
                  right: '10px', // Add this
                  top: '50%', // Add this
                  transform: 'translateY(-50%)', 
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff sx={{fontSize:16}} /> : <Visibility sx={{ fontSize: 16}} />}
              </IconButton>
            ),
          }}
        />
        </Grid>
        {error && <p style = {{color : 'red'}}>{error}</p>}
        <Button className='flex w-9/12 rounded-md bg-indigo-600 ml-8 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-300' type="submit" variant="contained" onClick={handleSubmit}>
          Login
        </Button>
        <Typography variant="body2" align="center" className='pt-1'>
          Don't have an account?{' '}
          <Link className='text-blue-500 hover:underline' component="button" variant="body2" onClick={handleSignupRedirect}>
            Sign up
          </Link>
        </Typography>
      </form>
    </Grid>
      
    </div>
  )
}
export default Login
