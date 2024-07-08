import { createSlice } from '@reduxjs/toolkit';

const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePassword = (password) => password.length >= 6;

const initialState = {
  users: [],
  isLoggedIn: false,
  token: null,
  // add other user-related state properties here
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Login reducer
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    // Logout reducer
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    //Validate Login
    validateLogin: (state, action) => {
      const { email, password } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
    },
    //Validate SignUp
    validateSignup: (state, action) => {
      const { email, password, confirmPassword } = action.payload;
      state.emailError = validateEmail(email) ? '' : 'Invalid email';
      state.passwordError = validatePassword(password) ? '' : 'Password must be at least 6 characters';
      state.confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
    },
      // Signup/AddUser reducer
    signupAddUser: (state, action) => {
      const user = action.payload;
      state.users.push(user);
      state.isLoggedIn = true;
      state.token = user.token;
      localStorage.setItem('users', JSON.stringify(state.users));
    },
  },
});

export const { login, logout, validateLogin, validateSignup, signupAddUser } = userSlice.actions;
export default userSlice.reducer;
