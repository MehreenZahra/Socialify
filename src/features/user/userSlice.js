// import { createSlice } from '@reduxjs/toolkit';

// const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
// const validatePassword = (password) => password.length >= 6;

// const initialState = {
//   users: [],
//   isLoggedIn: false,
//   token: null,
//   // add other user-related state properties here
// };

// export const userSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     // Login reducer
//     login: (state= initialState, action) => {
//       state.isLoggedIn = true;
//       state.token = action.payload.token;
//     },
//     // Logout reducer
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.token = null;
//     },
//     //Validate Login
//     validateLogin: (state, action) => {
//       const { email, password } = action.payload;
//       state.emailError = validateEmail(email) ? '' : 'Invalid email';
//       state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
//     },
//     //Validate SignUp
//     validateSignup: (state, action) => {
//       const { email, password, confirmPassword } = action.payload;
//       state.emailError = validateEmail(email) ? '' : 'Invalid email';
//       state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
//       state.confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
//     },
//       // Signup/AddUser reducer
//     signupAddUser: (state, action) => {
//       const user = action.payload;
//       state.users.push(user);
//       state.isLoggedIn = true;
//       state.token = user.token;
//       localStorage.setItem('users', JSON.stringify(state.users));
//     },
//   },
// });

// export const { login, logout, validateLogin, validateSignup, signupAddUser } = userSlice.actions;
// export default userSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: [],
//   error: null,
// };
// export const validateEmail = (email) => {
//   if (!email) {
//     return 'Email is required';
//   }
//   if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//     return 'Invalid email format';
//   }
//   return null;
// };

// export const validatePassword = (password) => {
//   if (!password) {
//     return 'Password is required';
//   }
//   if (password.length < 6) {
//     return 'Password must be at least 6 characters long';
//   }
//   return null;
// };
// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     signup(state, action) {
//       const { email, password, firstName, lastName, dob} = action.payload;
//       const emailError = validateEmail(email);
//       const passwordError = validatePassword(password);

//       if (emailError || passwordError) {
//         state.error = emailError || passwordError;
//         return;
//       }

//       // state.user = { email, password, firstName, lastName };
//       const user = action.payload;
//       state.user.push(user);
//       localStorage.setItem('user', JSON.stringify(state.user));
//     },
//     login(state, action) {
//       const { email, password } = action.payload;
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (email === storedUser.email && password === storedUser.password) {
//         state.user = storedUser;
//       } else {
//         state.error = 'Invalid email or password';
//       }
//     },
//   },
// });
// export const selectValidateEmail = (state) => state.user.validateEmail;
// export const selectValidatePassword = (state) => state.user.validatePassword;


// export const { signup, login } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
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
