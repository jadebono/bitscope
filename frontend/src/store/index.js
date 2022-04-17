import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";
import SubscribeSlice from "./SubscribeSlice";

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
    subscriber: SubscribeSlice.reducer,
  },
});

export default store;
