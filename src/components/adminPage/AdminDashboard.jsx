import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Stack, Avatar, CardActions, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import getUserInitials from '../../features/utils/getUserInitials';
import Navbar from '../Home/Navbar';
import AdminNavbar from './AdminNavbar';
function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const posts = useSelector(state => state.posts);
  // const initials = getUserInitials(users.firstName, users.lastName);
  const renderedUsers = {};
  return (
    
       <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item key={user.userId} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => console.log('Card clicked!')}>
            <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
        
              <Typography variant="h5" component="div" className="font-semibold">
                {user.firstName} {user.lastName}
              </Typography>
              </Stack>
              <Typography variant="body2">
                Email: {user.email}
              </Typography>
              <Typography variant="body2">
                Date of Birth: {user.dob}
              </Typography>
              {/* <Typography variant="body2">
                Gender: {user.gender}
              </Typography> */}
            </CardContent>
            <CardActions>
    <Button size="small">View Details</Button>
  </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )}
export default AdminDashboard
