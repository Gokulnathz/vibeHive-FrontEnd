import { createReducer } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('loginRequest', (state) => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error=null;
      state.isAuthenticated= true;
    })
    .addCase('loginFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false;
    })
    .addCase('registerRequest', (state) => {
      state.loading = true;
    })
    .addCase('registerSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated= true;
    })
    .addCase('registerFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false
    })
    
    .addCase('loadUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('loadUserSuccess', (state, action) => {
      
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated= true;
    })
    .addCase('loadUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false;
    })
    .addCase('logoutUserRequest', (state) => {
      state.loading = true;
    })
    .addCase('logoutUserSuccess', (state) => {
     
      state.loading = false;
      state.user = null;
      state.isAuthenticated= false;
      state.error=null; 
    })
    .addCase('logoutUserFailure', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    
    });
});

export const postOfFollowingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("postOfFollowingRequest", (state) => {
      state.loading = true;
      state.error = null; // Clear errors during a new request
    })
    .addCase("postOfFollowingSuccess", (state, action) => {
      state.loading = false;
      state.posts = action.payload; // Set posts from the action payload
    })
    .addCase("postOfFollowingFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture error from the action payload
    })
    .addCase("clearErrors", (state) => {
      state.error = null; // Reset the error state
    });
});
export const allUsersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("allUsersRequest", (state) => {
      state.loading = true;
      state.error = null; // Clear errors during a new request
    })
    .addCase("allUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload; // Set posts from the action payload
    })
    .addCase("allUsersFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture error from the action payload
    })
    .addCase("clearErrors", (state) => {
      state.error = null; // Reset the error state
    });
});
export const userProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("userProfileRequest", (state) => {
      state.loading = true;
      state.error = null; // Clear errors during a new request
    })
    .addCase("userProfileSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload; // Set posts from the action payload
    })
    .addCase("userProfileFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture error from the action payload
    })
    .addCase("clearErrors", (state) => {
      state.error = null; // Reset the error state
    });
});