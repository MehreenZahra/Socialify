import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminDashboard from './AdminDashboard';
import { Box } from '@mui/system';

function AdminLayout() {
  return (
    <Box>
    <AdminNavbar/>
    <AdminDashboard />
    </Box>
  )
}

export default AdminLayout
