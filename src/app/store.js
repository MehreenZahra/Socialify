import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
// import postsReducer from '../features/posts/postsSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: { user: persistedState },
});
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
