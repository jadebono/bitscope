import { createSlice } from "@reduxjs/toolkit";
// userSlice here to be globally available
// store state here at least: username, user ID from database

const initialState = {
  userId: "",
  username: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, action) {
      return (state = {
        logged: true,
        userId: action.payload.userId,
        username: action.payload.username,
      });
    },
    clearUser(state) {
      return (state = { logged: false, userId: "", username: "" });
    },
  },
});

export default UserSlice;
export const { setUser, clearUser } = UserSlice.actions;
