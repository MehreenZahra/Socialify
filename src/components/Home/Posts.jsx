// import React from 'react'
import { Avatar,  Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions , Checkbox} from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { fontSize } from '@mui/system';

function Posts() {
    const posts = useSelector(state => state.posts)
    const renderedPosts = posts.map(post => (
      <Card sx={{ maxWidth: 565 , margin : 5 }}>
      <CardHeader
        avatar={
          <Avatar src={post.avatar} aria-label="recipe">
            R
          </Avatar>
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
        subheader="June 27, 2024  04:30 p.m"
      />
      <CardMedia
        component="img"
        height="20%"
        image={post.image}
        alt="hunza-pic"
      />
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
      </CardActions>
    </Card>
    ))

  return (

       <>
       {renderedPosts}
       </>
  )
}

export default Posts
