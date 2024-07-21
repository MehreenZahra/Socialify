import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from '../features/user/userSlice'
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
      dispatch(login({ email, password }));
      navigate('/home');
    };
  
      const handleSignupRedirect = () => {
        navigate('/signup');
      };
    
  
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
    <Container className='flex justify-center max-h-screen '>
    <form  className='bg-white rounded-lg shadow-lg p-6'>
      <Typography variant="h2" align='center' gutterBottom style={{ fontSize: '40px', fontWeight: 'bold', color: 'blue' }} className='mt-5 text-center text-2xl font-bold leading-9 tracking-tight'>Login</Typography>
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
        <TextField
        className='block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 justify-center'
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          size='small'
          required
        />
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
    </Container>
      
    </div>
  )
}
export default Login
