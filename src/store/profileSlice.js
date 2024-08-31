import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: JSON.parse(localStorage.getItem('currentUser')) || {},
  password: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const updatedProfile = { ...state.profile, ...action.payload };
      localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
      state.profile = updatedProfile;
    },
    updatePassword: (state, action) => {
      const updatedProfile = { ...state.profile, password: action.payload };
      state.profile = updatedProfile;
      return state;
    },
    // updatePassword: (state, action) => {
    //   console.log('Retrieved users:', JSON.parse(localStorage.getItem('users')));
    //   const updatedProfile = { ...state.profile, password: action.payload };
    //   const users = JSON.parse(localStorage.getItem('users'));
    //   const updatedUsers = users.map((user) =>
    //     user.userId === updatedProfile.userId ? { ...user, password: action.payload } : user
    //   );
    //   // const index = users.findIndex((user) => user.userId === updatedProfile.userId);
    //   // if (index !== -1) {
    //   //   // users[index] = updatedProfile;
    //   //   users[index] = { ...users[index], password: action.payload };
    //   // }
    //   console.log('Updated users:', updatedUsers);
    //   localStorage.setItem('users', JSON.stringify(updatedUsers));
    //   localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
    //   state.profile = updatedProfile;
    //   state.password = action.payload;
    // },
    
  },
});

export const { updateProfile, updatePassword } = profileSlice.actions;
export default profileSlice.reducer;