import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import postsReducer from '../features/posts/postsSlice'
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    admin: adminReducer,
  },
});


export default store;
