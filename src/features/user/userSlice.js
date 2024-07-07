import { createSlice } from '@reduxjs/toolkit';
// import axios from "axios";
const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePassword = (password) => password.length >= 6;
const initialState = {
  // // currentUser: undefined,
  // isLoading: false,
  // user: JSON.parse(localStorage.getItem('user')) || null,
  // isAuthenticated: !!localStorage.getItem('user'),
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('users')) || [],
  isAuthenticated: !!localStorage.getItem('currentUser'),
};




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    validateLogin: (state, action) => {
      const { email, password } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
    },
    signup: (state, action) => {
      const { email, password, confirmPassword } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
      // state.confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
      // state.isAuthenticated = true;
      // localStorage.setItem('user', JSON.stringify(action.payload));

      const updatedUsers = [...state.users, action.payload];
      state.users = updatedUsers;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, validateLogin, signup } = userSlice.actions;
export default userSlice.reducer;
