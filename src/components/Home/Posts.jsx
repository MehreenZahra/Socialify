// import React from 'react'
import { Avatar,  Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions , Checkbox, Modal} from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../store/postsSlice';
import { TimeAgo } from '../../store/TimeAgo';
import {
  Menu,
  MenuItem,
 Snackbar,
  Button,
  Dialog,DialogActions,DialogContent,DialogTitle, DialogContentText, Alert,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ReportIcon from '@mui/icons-material/Report';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Backdrop from '@mui/material/Backdrop';
import { useState } from 'react';
import { Box } from '@mui/system';
function Posts({ page, postsPerPage }) {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const post = posts.find((post) => post.id === post.postId);
 
    // const initials = getUserInitials(user.firstName, user.lastName);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPagePosts = orderedPosts.slice(startIndex, endIndex);
    const [anchorEl, setAnchorEl]=useState(null);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // const user = useSelector((state) => state.currentUser); // assuming you have a currentUser reducer
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      console.log('User ID:', user?.userId);
console.log('Post ID:', post?.userId)
console.log('id:', post?.id)
      setAnchorEl(null);
    };
  
    const handleDeletePostClick = () => {
      setOpenConfirmDialog(true);
      handleMenuClose();
      
    };
  
    
    const handleCancelDelete = () => {
      setOpenConfirmDialog(false);
    };


    
  
  function renderMenuItem() {
  if (user?.userId && post?.userId) {
    if ( user.userId === post.userId) {
      console.log('Rendering Delete Post option');
      return (
        <MenuItem onClick={handleDeletePostClick}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          Delete Post
        </MenuItem>
      );
    } else {
      console.log('Rendering Comment option');
      return (
        <MenuItem>
          <CommentIcon sx={{ marginRight: 1 }} />
          Comment
        </MenuItem>
      );
    }
  } else {
    return (
      <MenuItem>
        <CommentIcon sx={{ marginRight: 1 }} />
        Comment
      </MenuItem>
    );
  }
  }
  
   
  const handleDelete = () => {
  const post = posts.find((post) => post.id === post.postId);
  // const user = JSON.parse(localStorage.getItem('currentUser'));
  // if (post.userId === user.userId) {
    console.log('Delete button clicked, post:', post); 
    console.log('Dispatching deletePost with postId:', post.id);  
      dispatch(deletePost(post.id));
      setOpenConfirmDialog(false);
      setOpenSnackbar(true);
    };  
    
  

    const renderedPosts = currentPagePosts.map(post => (
    
      <Card key={post.id} sx={{ maxWidth: 565 , margin : 5 }}>
      <CardHeader
        avatar={
        post.avatar.includes('http') ? ( <Avatar src={post.avatar} />) : (<Avatar>{post.avatar}</Avatar>)
        }
        action={
          <IconButton aria-label="settings"  onClick={handleMenuClick} >
            <MoreVertIcon />
          </IconButton>
          
        }
        titleTypographyProps={{
          fontSize: 16,
          variant : 'h6',
          fontWeight: 'bold',
          marginLeft:'6px',
        }}
        title={post.title}
        subheaderTypographyProps={{
          fontSize: 11,
          
        }}
        subheader={<TimeAgo timestamp={post.date} />}
        sx={{
          '& .MuiCardHeader-subheader': {
            width: '100%',
            textAlign: 'left',
          },
        }}
      />
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>
          <BookmarkBorderIcon sx={{ marginRight: 1 }}/>
          Save Post 
          </MenuItem>
          {renderMenuItem()}
          <MenuItem>
          <ReportIcon sx={{ marginRight: 1 }}/>
          Report Post 
          </MenuItem>
        </Menu>
        {openConfirmDialog && (
        <Modal
          open={openConfirmDialog}
          onClose={handleCancelDelete}
            aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ style: { backgroundColor: 'transparent',  backdropFilter: 'blur(40px)', } }}
      
        >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgColor: '#fff',
            border: '2px solid #000',
            boxShadow: 15,
            p: 4, 
          }}>  
           <Typography id="delete-post-modal" variant="h6" component="h2">
             Delete Post
           </Typography>
           <Typography id="delete-post-modal-description" sx={{ mt: 2 }}>
             Are you sure you want to delete this post?
           </Typography>
           <Button onClick={handleCancelDelete}  sx={{
              backgroundColor: '#4CAF50',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              mt:2,
              mr: 6,
            }}>Cancel</Button>
           <Button onClick={handleDelete}  sx={{  
              backgroundColor:'#ff0000',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              mt: 2 }}>Delete</Button>
        </Box>
        </Modal>
      )}
      {post.image ? ( <CardMedia
        component="img"
        height="20%"
        image={post.image}
      />) : null}
      <CardContent>
        <Typography variant="body2" >
          {post.content}
        </Typography>
      </CardContent>
      
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        <Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'red'}} />} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* {post.userId === user.userId ? (
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>) : null } */}
      </CardActions>
    </Card>
    ))
  return (

       <>
       {renderedPosts}
       <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert severity="success">Post deleted successfully!</Alert>
    </Snackbar>
       </>
  )
}

export default Posts
