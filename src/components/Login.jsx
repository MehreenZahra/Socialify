import React, { useState } from 'react';
import { Button,  Typography, Link, Grid } from '@mui/material';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from '../store/userSlice';
import CustomInput from './textInputs/CustomInput';

// Load environment variables
// dotenv.config();


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
      if (email === process.env.REACT_APP_SOCIALIFY_ADMIN_EMAIL && password === process.env.REACT_APP_SOCIALIFY_ADMIN_PASSWORD) {
        dispatch(login({ email, password }));
        navigate('/admin');
      } else if (userFound) {
        if (userFound.isBlocked) {
          setError('Your account has been blocked');
          return;
        }
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
      <CustomInput
              type="email"
              label="Email"
              placeholder='john@gmail.com'
              value={email}
              onChange={(e) => setEmail(e)}
            
            />
              <CustomInput
              type='password'
              label="Password"
              value={password}
              onChange={(e) => setPassword(e)}
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
