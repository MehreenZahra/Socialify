
import React from 'react';
import Navbar from './Navbar'
import { Box, Stack } from '@mui/system';
import { Outlet, useLocation } from 'react-router-dom';
import AdminLayout from '../adminPage/AdminLayout';
import { useSelector } from 'react-redux';
 function Home() {
  const location = useLocation();
  const isAdmin = useSelector((state) => state.user.role === 'admin');
  return (
    <Box>
       <Navbar/>
     <Stack direction='row' spacing={2} justifyContent="space-around" >
       <Box sx={{ display: 'flex', justifyContent: 'center', width: '60%' }}>
       {isAdmin ? (
        <AdminLayout />
      ) : (
       <Outlet context={{
         showEditProfile: location.pathname === '/home/edit-profile',
         showChangePassword: location.pathname === '/home/change-password' }} />
       )}
       </Box>
      </Stack>
    </Box>
  )
}

export default Home
