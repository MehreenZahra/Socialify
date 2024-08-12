//
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
const initialState = {
  user: [],
  users: JSON.parse(localStorage.getItem('users')) || [],
  error: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup: (state, action) => {
      const { email, password, firstName, lastName, dob, gender } = action.payload;
      if (!email || !password || !firstName || !lastName || !dob) {
        state.error = 'All fields are required';
        return
      };
      if (firstName.toLowerCase() === 'admin' && state.users.find((user) => user.role === 'admin')) {
        state.error = 'Admin role already taken';
        return;
      }
      if (state.users.find((user) => user.email === email)) {
        state.error = 'Email already registered';
        return;
      }
      const userId = nanoid()
      const role = firstName.toLowerCase() === 'admin' ? 'admin' : 'user';
      const newUser = { email, password, firstName, lastName, dob, userId, gender,role };
      console.log('New user:', newUser);
      state.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.users));
      state.user = newUser;
      localStorage.setItem('currentUser', JSON.stringify(newUser)); 
      localStorage.setItem('newUser', JSON.stringify(state.user))
      state.error = null;
      return state;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      if (!email || !password) {
        state.error = 'Email and password are required';
        return;
      }
      const users = JSON.parse(localStorage.getItem('users')) || [];
      console.log('Attempting login with email:', email);
      console.log('Users in localStorage:', users);
      // matching email and password by using find function
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        console.log('User found:' , user);
        state.user = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        state.error = null;
        if (user.role === 'admin') {
          state.isAdmin = true;
        }
      } else {
        state.user = null;
        state.error = 'Invalid email or password';
        }
        return state;
      
    },
    logout: (state) => {
      console.log('Logout action handled');
      state.user = null;
      state.error= null;
      // state.isAdmin = false;
    },
  },
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
