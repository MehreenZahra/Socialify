// import React from 'react'
import { Avatar, Box, Card, CardHeader, IconButton, CardMedia, CardContent, Typography, CardActions , Checkbox} from '@mui/material'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Posts() {
  return (
    
      <Card sx={{ maxWidth: 565 , margin : 5 }}>
      <CardHeader
        avatar={
          <Avatar src='https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Usama Shaukat"
        subheader="June 27, 2024  04:30 p.m"
        // subheader="4:30p.m"
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/11852594/pexels-photo-11852594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="hunza-pic"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        "To travel is to take a journey into yourself” is a quote by Danny Kaye that speaks to the introspective aspect of travel. When we travel, we are not just physically moving from one place to another but also embarking on a journey of self-discovery. By stepping out of our comfort zones and exposing ourselves to new experiences, we gain a deeper understanding of ourselves and what we value. This quote reminds us that travel can be a powerful tool for personal growth and self-reflection.
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
    
  )
}

export default Posts
