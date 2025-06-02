import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  
};

export const likeReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("likeRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("likeSuccess", (state, action) => {
            console.log("like success", action.payload);
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("likeFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        .addCase("clearErrors", (state) => {
            state.error = null; // Reset the error state
        })
        .addCase("addCommentRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("addCommentSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("addCommentFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        .addCase("deleteCommentRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("deleteCommentSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("deleteCommentFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        .addCase("newPostRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("newPostSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("newPostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        .addCase("updateCaptionRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("updateCaptionSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("updateCaptionFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        
        .addCase("deletePostRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("deletePostSuccess", (state, action) => {
            state.loading = false;
            state.post = action.payload; // Set posts from the action payload
        })
        .addCase("deletePostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
       .addCase("updateProfileRequest", (state) => {
            state.loading = true;
          })
          .addCase("updateProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("updateProfileFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          
          .addCase("clearMessage", (state) => {
            state.message = null;
          })
       .addCase("updatePasswordRequest", (state) => {
            state.loading = true;
          })
          .addCase("updatePasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("updatePasswordFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        
       .addCase("deleteProfileRequest", (state) => {
            state.loading = true;
          })
          .addCase("deleteProfileSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("deleteProfileFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
       .addCase("followUserRequest", (state) => {
            state.loading = true;
          })
          .addCase("followUserSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("followUserFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
       .addCase("forgotPasswordRequest", (state) => {
            state.loading = true;
          })
          .addCase("forgotPasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("forgotPasswordFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
       .addCase("resetPasswordRequest", (state) => {
            state.loading = true;
          })
          .addCase("resetPasswordSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
          })
          .addCase("resetPasswordFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        ;
});

export const myPostReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("myPostRequest", (state) => {
            state.loading = true;
            state.error = null; // Clear errors during a new request
        })
        .addCase("myPostSuccess", (state, action) => {
            state.loading = false;
            state.posts = action.payload; // Set posts from the action payload
            console.log("state.posts: ",state.posts)
            console.log("state.loading :",state.loading);
            state.error = null;
        })
        .addCase("myPostFailure", (state, action) => {
            state.loading = false;
            state.error = action.payload; // Capture error from the action payload
        })
        .addCase("clearErrors", (state) => {
            state.error = null; // Reset the error state
        });
});

export const userPostReducer = createReducer(initialState, (builder) => {
  builder
      .addCase("userPostRequest", (state) => {
          state.loading = true;
          state.error = null; // Clear errors during a new request
      })
      .addCase("userPostSuccess", (state, action) => {
          state.loading = false;
          state.posts = action.payload; // Set posts from the action payload
      })
      .addCase("userPostFailure", (state, action) => {
          state.loading = false;
          state.error = action.payload; // Capture error from the action payload
      })
      .addCase("clearErrors", (state) => {
          state.error = null; // Reset the error state
      });
});