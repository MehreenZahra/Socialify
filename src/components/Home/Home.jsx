
import React from 'react';
import Sidebar from './Sidebar'
import Feed from './Feed'
import Navbar from './Navbar'
import { Box, Stack } from '@mui/system';


 function Home() {
  return (
    <Box>
       <Navbar/>
     <Stack direction='row' spacing={2} justifyContent="space-between" >
       <Sidebar/>
       <Feed/>
      </Stack>
    </Box>
  )
}

export default Home
