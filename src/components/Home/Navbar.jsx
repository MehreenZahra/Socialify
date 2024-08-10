import { AppBar, Avatar, Badge, InputBase, Menu, MenuItem, Toolbar, Typography,Link } from '@mui/material'
import { Box, styled } from '@mui/system'
import React, { useState } from 'react'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import getUserInitials from '../../features/utils/getUserInitials';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';





const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'space-between'
});
const Search = styled("div")(({theme}) => ({
  backgroundColor:"white",
  padding :"0 10px",
  borderRadius: '10px',
  width:'30%'
}));
const Icons = styled(Box)(({theme}) => ({
  display: 'none' ,alignItems : 'center', gap:'20px' ,
  [theme.breakpoints.up("sm")] : {
    display: "flex"
  }}));
 
export default function Navbar() {
  // const user = useSelector((state) => state.user.user);
  const profile = JSON.parse(localStorage.getItem('currentUser'));
  const avatarUrl = profile.avatar; 
  const initials = getUserInitials(profile.firstName, profile.lastName);

  // const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleLogoutRedirect = () => {
    // dispatch(logout());
    navigate('/');
    setOpen(false);
  };
  const handleEditProfileClick = () => {
    navigate('/home/edit-profile');
    setOpen(false);
  };
  const handleSocialifyClick = () => {
    navigate('/home');
    setOpen(false);
  };
  const handleChangePasswordClick = () => {
    navigate('/home/change-password');
    setOpen(false);
  }
  return (
    <AppBar position="sticky">
      
        <StyledToolbar>
        <Typography className="ml-16 font-semibold" variant='h6' sx={{display:{xs:"none", sm:"block"} ,"&:hover": {cursor: 'pointer'}}} onClick={handleSocialifyClick}>Socialify</Typography>
        <Diversity2Icon sx={{display:{xs:"block", sm:"none"}}}/>
        <Search> <InputBase placeholder='Search...'/></Search>
        <Icons  sx={{ "&:hover": {cursor: 'pointer' }}}>
        <Badge badgeContent={4} color="error">
        <MailIcon />
        </Badge>
        <Badge badgeContent={6} color="error">
        <NotificationsIcon />
       </Badge>
      {avatarUrl ? (<Avatar src={avatarUrl}/>) : ( <Avatar sx={{width:40, height:40}} >{initials}</Avatar>)}
      {/* src="https://images.pexels.com/photos/8575841/pexels-photo-8575841.jpeg"  */}
       {profile && <Typography className="font-semibold" variant='span'>{profile.firstName}</Typography>}
       <ArrowDropDownIcon fontSize='medium' onClick={e => setOpen(true)}></ArrowDropDownIcon>
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
        <MenuItem onClick={handleEditProfileClick}>Edit Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem onClick={handleChangePasswordClick}>Change Password</MenuItem>
        <MenuItem >
        <Link onClick={handleLogoutRedirect} >Logout </Link> 
        </MenuItem>
      </Menu> 
    </AppBar>
  )
}
