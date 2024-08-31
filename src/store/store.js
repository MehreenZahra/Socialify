import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postsSlice'
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    admin: adminReducer,
  },
});


export default store;
