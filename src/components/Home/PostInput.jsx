import React, { useState } from 'react'
import { Card, CardContent, CardActions, Grid, IconButton, Button ,CardHeader , Avatar , Badge} from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { PhotoCamera, VideoCall, AttachFile } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addPost } from '../../features/posts/postsSlice';
import {  nanoid, unwrapResult } from '@reduxjs/toolkit';
import getUserInitials from '../../features/utils/getUserInitials';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  // const SmallAvatar = styled(Avatar)(({ theme }) => ({
  //   width: 22,
  //   height: 22,
  //   border: `2px solid ${theme.palette.background.paper}`,
  // }));
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

   const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
function PostInput() {
  const [image, setImage] = useState('')
  const [content,setContent] = useState('')
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const avatarUrl = user.avatar; 
  const initials = getUserInitials(user.firstName, user.lastName);


  const onPostSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      content,
      title:`${user?.firstName || ''}${user?.firstName && user?.lastName ? '   ' : ''}${user?.lastName || ''}`.trim(),

      // title: `${user?.firstName || 'Anonymous'}${user?.lastName || ''}`.trim(),
      avatar: avatarUrl || initials,
      date: new Date().toISOString(),
      userId: user.userId,
      postId: nanoid(),
    };
    if (image) { 
      payload.image = image;
    };
    const resultAction = await dispatch(addPost(payload));
    unwrapResult(resultAction); 
    setContent('');
    // setTitle('');
    setImage('');
    console.log('post added:', payload)
  };
  return (
    <div>
     <Card  sx={{ maxWidth: 565 , margin : 5 }}>
     <CardHeader
        avatar={
      <StyledBadge
      sx={{ "&:hover": {cursor: 'pointer' }}}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
         {avatarUrl ? (<Avatar src={avatarUrl}/>) : (<Avatar>{initials}</Avatar>)}
        </StyledBadge>
            
          
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        titleTypographyProps={{
            fontSize: 16,
             variant : 'h6',
          fontWeight: 'bold'
          }}
          subheaderTypographyProps={{
            fontSize: 10,
          }}
        // title={`${user?.firstName || 'Anonymous'} ${user?.lastName || ''}`.trim()}
        title={`${user?.firstName || ''}${user?.firstName && user?.lastName ? ' ' : ''}${user?.lastName || ''}`.trim()}

        
      />
      <CardContent>
        <Textarea 
        aria-label="minimum height" 
        minRows={3} 
        placeholder="Type Something to Post" 
        style={{ width: "100%" , height:"5%"}}
        value = {content}
        onChange={(e) => setContent(e.target.value)}/>

      </CardContent>
      <CardActions>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <input
              accept="image/*"
              className="hidden"
              id="icon-button-photo"
              type="file"
              multiple
              onChange={(e) => setImage (e.target.files[0])}
            />
            <label htmlFor="icon-button-photo">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <input
              accept="video/*"
              className="hidden"
              id="icon-button-video"
              type="file"
              multiple
              onChange={(e) => setImage (e.target.files[0])}
            //   onChange={handleMediaChange}
            />
            <label htmlFor="icon-button-video">
              <IconButton color="primary" component="span">
                <VideoCall />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <input
              accept="*"
              className="hidden"
              id="icon-button-file"
              type="file"
              multiple
            //   onChange={handleMediaChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span">
                <AttachFile />
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onPostSubmit}
            
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
    </div>
  )
}

export default PostInput
