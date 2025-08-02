import { configureStore } from "@reduxjs/toolkit";

import feedSliceReducer from "./slices/feed-slice";
import usersSliceReducer from "./slices/user-slice";

const store = configureStore({
  reducer: {
    feed: feedSliceReducer,
    users: usersSliceReducer,
  },
});

export default store;

export const selectFeedState = (state) => state.feed;
export const selectUsersState = (state) => state.users;
