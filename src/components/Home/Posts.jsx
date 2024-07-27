// import React from 'react'
import { Avatar,  Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions , Checkbox} from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../features/posts/postsSlice';
import { TimeAgo } from '../../features/posts/TimeAgo';
import getUserInitials from '../../features/utils/getUserInitials';




function Posts({ page, postsPerPage }) {
    // const user = useSelector((state)=> state.user.user);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    // const avatarUrl= posts.avatar; 
    const initials = getUserInitials(user.firstName, user.lastName);
    // const [page, setPage] = React.useState(1);
    // const postsPerPage = 10;
    // const handlePageChange = (event, value) => {
    //   setPage(value);
    // };
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPagePosts = orderedPosts.slice(startIndex, endIndex);
  
    // const startIndex = (page - 1) * postsPerPage;
    // const endIndex = startIndex + postsPerPage;
    // const currentPagePosts = posts.slice(startIndex, endIndex);
    
    
    const handleDelete = (postId) => {   
  const post = posts.find((post) => post.id === postId);
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (post.userId === user.email) {
    dispatch(deletePost(postId));
  } else {
    // alert("You can only delete your own posts!");
  }
    };
  
  

    const renderedPosts = currentPagePosts.map(post => (
    
      <Card key={post.id} sx={{ maxWidth: 565 , margin : 5 }}>
      <CardHeader
        avatar={
        post.avatar.includes('http') ? ( <Avatar src={post.avatar} />) : (<Avatar>{post.avatar}</Avatar>)
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        titleTypographyProps={{
          fontSize: 16,
          variant : 'h6',
          fontWeight: 'bold'
        }}
        title={post.title}
        // title={`${user?.firstName || ''}${user?.firstName && user?.lastName ? ' ' : ''}${user?.lastName || ''}`.trim()}
        // subheader="June 27, 2024  04:30 p.m"
        // subheader= 
        subheaderTypographyProps={{
          fontSize: 11
        }}
        subheader={<TimeAgo timestamp={post.date} />}
      />
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
        {/* console.log('Post userId:', post.userId);
        console.log('Current user userId:', user.userId); */}
        {post.userId === user.userId ? (
              <IconButton aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>) : null }
      </CardActions>
    </Card>
    ))
    // post.avatar = post.avatar || initials;
  return (

       <>
       {renderedPosts}
       </>
  )
}

export default Posts
