import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";
import NotificationSlice from "./NotificationsSlice";
import SubscribeSlice from "./SubscribeSlice";

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
    subscriber: SubscribeSlice.reducer,
    notification: NotificationSlice.reducer,
  },
});

export default store;
