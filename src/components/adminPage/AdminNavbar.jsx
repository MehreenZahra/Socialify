import { Box, styled } from '@mui/system'
import { AppBar, InputBase, Menu, MenuItem,Typography,  Toolbar,Badge,Avatar } from '@mui/material'
import { React, useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { logout } from '../../features/user/userSlice';

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
   
function AdminNavbar() {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/');
    setOpen(false);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
       <AppBar position="sticky">
      
      <StyledToolbar>
      <Typography className="ml-16 font-semibold" variant='h6' sx={{display:{xs:"none", sm:"block"} ,"&:hover": {cursor: 'pointer'}}} >Socialify</Typography>
      <Diversity2Icon sx={{display:{xs:"block", sm:"none"}}}/>
      <Search> <InputBase placeholder='Search...'/></Search>
      <Icons  sx={{ "&:hover": {cursor: 'pointer' }}}>
      <Badge badgeContent={4} color="error">
      <MailIcon />
      </Badge>
      <Badge badgeContent={6} color="error">
      <NotificationsIcon />
     </Badge>
    <Avatar sx={{width:40, height:40}} >AD</Avatar>
    {/* src="https://images.pexels.com/photos/8575841/pexels-photo-8575841.jpeg"  */}
     <Typography className="mr-2 font-semibold" variant='span'>Admin</Typography>
     <ArrowDropDownIcon fontSize='medium' onClick={handleMenuOpen}></ArrowDropDownIcon>
      </Icons>
    </StyledToolbar> 
    <Menu
      id="basic-menu"
      open={open}
      onClose={handleMenuClose}
      anchorEl={anchorEl}
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
      <MenuItem>Admin Profile</MenuItem>
      <MenuItem >Statistics</MenuItem>
      <MenuItem>Change Password</MenuItem>
      <MenuItem onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu> 
  </AppBar>
    </div>
  )
}

export default AdminNavbar
