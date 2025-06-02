// import { configureStore } from "@reduxjs/toolkit";
// import { allUsersReducer, postOfFollowingReducer, userReducer } from "./reducers/user";
// import { likeReducer, myPostReducer } from "./reducers/post";


// const initialState={};

// const store= configureStore({ 
//     reducer:{
//         user:userReducer,
//         postOfFollowing:postOfFollowingReducer,
//         allUsers:allUsersReducer,
//         like:likeReducer,
//         myPosts:myPostReducer,
//     },
//     preloadedState: initialState, 
// });
// export default store; 

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer
} from "./reducers/user";
import { likeReducer, myPostReducer, userPostReducer } from "./reducers/post";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  postOfFollowing: postOfFollowingReducer,
  allUsers: allUsersReducer,
  like: likeReducer,
  myPosts: myPostReducer,
  userProfile:userProfileReducer,
  userPost:userPostReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the 'user' slice
};

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const isDev = import.meta.env.MODE !== "production";


// Configure the store with middleware adjustments
const store = configureStore({
  reducer: persistedReducer,
  devTools: isDev,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore persistence actions
        ignoredPaths: ["register"], // Ignore specific state paths if needed
      },
    }),
  preloadedState: {},
});

const persistor = persistStore(store);

export { store, persistor };
