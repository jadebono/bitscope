import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";
import NotificationSlice from "./NotificationsSlice";
import SubscribeSlice from "./SubscribeSlice";
import UserSlice from "./UserSlice";

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
    notification: NotificationSlice.reducer,
    subscriber: SubscribeSlice.reducer,
    user: UserSlice.reducer,
  },
});

export default store;

/*
!! persist code

import { configureStore } from "@reduxjs/toolkit";
import NavBarSlice from "./NavBarSlice";
import NotificationSlice from "./NotificationsSlice";
import SubscribeSlice from "./SubscribeSlice";
import UserSlice from "./UserSlice";

// persist storage
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// the second parameter here takes the slice.reducer
const persistedReducerUser = persistReducer(persistConfig, UserSlice.reducer);

const store = configureStore({
  reducer: {
    navbar: NavBarSlice.reducer,
    notification: NotificationSlice.reducer,
    subscriber: SubscribeSlice.reducer,
    user: persistedReducerUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
*/
