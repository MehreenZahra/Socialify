import { Box } from '@mui/material'
import React from 'react'
import Posts from './Posts'
import PostInput from './PostInput';
import Pagination from '@mui/material/Pagination';

export default function Feed() {
  const [page, setPage] = React.useState(1);
  const postsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box  flex={4} p={2}>
      <PostInput/>
      <Posts page={page} postsPerPage={postsPerPage} />
      <Pagination
         sx={{
          '& > .MuiPagination-ul': {
            margin: "auto",
            width: "fit-content",
            // alignItems: "center",
          },
        }}
        variant="outlined" color="primary"
        page={page}
        count={Math.ceil(13 / postsPerPage)} 
        onChange={handlePageChange}
        rowsPerPage={postsPerPage}
        rowsPerPageOptions={[postsPerPage]}
      />
      {/* <Posts/> */}
      {/* <Posts/> */}
    </Box>
      
    
  )
}
