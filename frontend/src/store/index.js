import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
  },
});

export default store;
