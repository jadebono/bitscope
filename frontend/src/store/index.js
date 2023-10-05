// Index.js 
// * the state store
import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";
import NotificationSlice from "./NotificationsSlice";
import SubscribeSlice from "./SubscribeSlice";
import UpdateButtonsSlice from "./UpdateButtonsSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
    notification: NotificationSlice.reducer,
    subscriber: SubscribeSlice.reducer,
    user: UserSlice.reducer,
    updatebuttons: UpdateButtonsSlice.reducer,
  },
});

export default store;
