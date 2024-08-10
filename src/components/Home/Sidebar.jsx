import React from 'react';
import {Box} from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

function Sidebar() {
  return (
    <Box sx={{pt: 9 , display:{xs: "none" , sm: "block"}}} flex={1} p={8}>
      <Box position="fixed">
      <List >
          <ListItem disablePadding className='hover:bg-indigo-100'>
            <ListItemButton component='a' >
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding  className='hover:bg-indigo-100'>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <InsightsIcon/>
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>
          </ListItem >
          <ListItem disablePadding  className='hover:bg-indigo-100'>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <GroupsIcon  color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding  className='hover:bg-indigo-100'>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <StorefrontIcon/>
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding  className='hover:bg-indigo-100'>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <TaskAltIcon/>
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding  className='hover:bg-indigo-100'>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          
      </List>   
      </Box> 
    </Box>
  )
}

export default Sidebar
