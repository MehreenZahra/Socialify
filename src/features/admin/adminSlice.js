import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdmin: false,
  users: [], // or use the users from userSlice
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Add admin-specific actions here, e.g., getUsers, deleteUser, etc.
  },
});

export const { /* admin actions */ } = adminSlice.actions;
export default adminSlice.reducer;