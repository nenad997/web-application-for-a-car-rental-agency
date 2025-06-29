import { configureStore } from "@reduxjs/toolkit";

import feedSliceReducer from "./slices/feed-slice";

const store = configureStore({
  reducer: {
    feed: feedSliceReducer,
  },
});

export default store;

export const selectFeedState = (state) => state.feed;
