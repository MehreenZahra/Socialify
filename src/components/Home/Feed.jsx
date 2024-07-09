import { Box} from '@mui/material'
import React from 'react'
import Posts from './Posts'
import PostInput from './PostInput'

export default function Feed() {
  return (
    <Box  flex={4} p={2}>
      <PostInput/>
      <Posts/>
      {/* <Posts/> */}
      {/* <Posts/> */}
    </Box>
      
    
  )
}
