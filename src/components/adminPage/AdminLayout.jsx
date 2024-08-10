import React from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from '../Home/Sidebar';
import AdminDashboard from './AdminDashboard';
import { Box, Stack} from '@mui/system';
import { Card, Typography } from '@mui/material';

function AdminLayout() {
  return (
    <Box>
    <AdminNavbar/>
  <Stack direction='row' spacing={20} justifyContent="space-between" >
    <Sidebar/>
    <Stack direction='column' spacing={4}>
    <Card sx={{
        boxShadow: 2,
        borderRadius: 2,
        marginTop: 40,
        padding: 4,
        width: '100%',
        maxWidth: '1000px',
        margin: 'auto',
        backgroundColor: '#fff'
      }}>
      <Typography variant="h4" component="div" sx={{ mb: 2 }}>
      "Hello, Admin!"
      </Typography>
      </Card>
    {/* <Box sx={{ display: 'flex', justifyContent: 'center', width: '60%' }}> */}
     <AdminDashboard />
    
   </Stack>
   {/* <Rightbar/> */}
    {/* </Box> */}
   </Stack>
 </Box>
  )
}

export default AdminLayout
