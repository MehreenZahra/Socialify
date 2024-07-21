import { AppBar, Avatar, Badge, InputBase, Menu, MenuItem, Toolbar, Typography,Link } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { useState } from 'react'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
// import { logout } from '../../features/user/userSlice';



const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'space-between'
});
const Search = styled("div")(({theme}) => ({
  backgroundColor:"white",
  padding :"0 10px",
  borderRadius: '20px',
  width:'40%'
}));
const Icons = styled(Box)(({theme}) => ({
  display: 'none' ,alignItems : 'center', gap:'20px' ,
  [theme.breakpoints.up("sm")] : {
    display: "flex"
  }}));
 
export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleLogoutRedirect = () => {
    // dispatch(logout());
    navigate('/');
  };
  return (
    <AppBar position="sticky">
      
        <StyledToolbar>
        <Typography variant='h6' sx={{display:{xs:"none", sm:"block"}}}>Socialify</Typography>
        <Diversity2Icon sx={{display:{xs:"block", sm:"none"}}}/>
        <Search> <InputBase placeholder='Search...'/></Search>
        <Icons  sx={{ "&:hover": {cursor: 'pointer' }}}>
        <Badge badgeContent={4} color="error">
        <MailIcon />
        </Badge>
        <Badge badgeContent={6} color="error">
        <NotificationsIcon />
       </Badge>
       <Avatar sx={{width:30, height:30}}alt="Cindy Baker" src="https://images.pexels.com/photos/8575841/pexels-photo-8575841.jpeg" />
       {user && <Typography variant='span'>{user.firstName}</Typography>}
       <KeyboardArrowDownIcon fontSize='medium' onClick={e => setOpen(true)}></KeyboardArrowDownIcon>
        </Icons>
      </StyledToolbar> 
      <Menu
        id="basic-menu"
        open={open}
        onClose={e => setOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical:"top",
          horizontal:"right",
        }}
        transformOrigin={{
          vertical:"top",
          horizontal:"right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >
        <Link onClick={handleLogoutRedirect} >Logout </Link> 
        </MenuItem>
      </Menu> 
    </AppBar>
  )
}
