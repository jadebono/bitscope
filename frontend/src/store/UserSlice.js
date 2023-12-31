// UserSlice.js
// * user data state

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged: false,
  userId: "",
  username: "",
  currency: "BTC", // Default to BTC
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
        currency: action.payload.currency || state.currency, // Set currency from action payload or keep existing currency
      });
    },
    clearUser(state) {
      return (state = {
        logged: false,
        userId: "",
        username: "",
        currency: "BTC",
      }); // Reset to initial state
    },
    updateCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export default UserSlice;
export const { setUser, clearUser, updateCurrency } = UserSlice.actions;
