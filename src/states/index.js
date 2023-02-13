import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadDetailReducer from './detailThread/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import commentReducer from './comment/reducer';
import leaderboardsReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    loadingBar: loadingBarReducer,
    comments: commentReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
