import axios from "axios";

const REACT_APP_API_URL='https://vibehive-backend-ogin.onrender.com'
export const likePost = (id) => async (dispatch) => {
    try {
      dispatch({ type: "likeRequest" });

  
      const { data } = await axios.get(`${REACT_APP_API_URL}/post/${id}/like`, { withCredentials: true });
  
       console.log("Likes loaded:", data.message);
  
      dispatch({ type: "likeSuccess", payload: data.message });
    } catch (error) {
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "allUsersFailure", payload: error.response?.data?.message || error.message });
    }
  };
export const addCommentOnPost = (id,comment) => async (dispatch) => {
    try {
      dispatch({ type: "addCommentRequest" });

  console.log('id:',id)
      const { data } = await axios.put(`${REACT_APP_API_URL}/add/comment/${id}`,{comment},
         { withCredentials: true });
  
      console.log(" comment loaded:", data.message);
  
      dispatch({ type: "addCommentSuccess", payload: data.message });
    } catch (error) {
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "allUsersFailure", payload: error.response?.data?.message || error.message });
    }
  };

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
      dispatch({ type: "deleteCommentRequest" });

  
      const { data } = await axios.delete(`${REACT_APP_API_URL}/delete/comment/${id}`,{data:{commentId}, withCredentials: true });
  
    //   console.log(" omment loaded:", data.message);
  
      dispatch({ type: "deleteCommentSuccess", payload: data.message });
    } catch (error) { 
      const errorMessage = "Failed to get following posts.";  
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "allUsersFailure", payload: error.response?.data?.message || error.message }); 
    }
  };
export const createNewPost = (caption,image) => async (dispatch) => {
    try {
      dispatch({ type: "newPostRequest" });
      console.log("inside create new post")

      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('image', image);
  
      const { data } = await axios.post(`${REACT_APP_API_URL}/post/upload`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include cookies for authentication
      });
  
    //   console.log(" omment loaded:", data.message);
  
      dispatch({ type: "newPostSuccess", payload: data.message });
    } catch (error) { 
      const errorMessage = "Failed to get following posts.";  
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "allUsersFailure", payload: error.response?.data?.message || error.message }); 
    }
  };
  
export const updatePost = (caption,id) => async (dispatch) => {
    try {
      dispatch({ type: "updateCaptionRequest" });
      console.log(id)
      console.log(caption)
     
      const { data } = await axios.put(`${REACT_APP_API_URL}/update/caption/${id}`,{caption}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies for authentication
      });
      console.log(data)
  
    //   console.log(" omment loaded:", data.message);
  
      dispatch({ type: "updateCaptionSuccess", payload: data.message });
    } catch (error) { 
      const errorMessage = "Failed to get following posts.";  
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "updateCaptionFailure", payload: error.response?.data?.message || error.message }); 
    }
  };
export const deletePost = (id) => async (dispatch) => {
    try {
      
      dispatch({ type: "deletePostRequest" });
      
      const { data } = await axios.delete(`${REACT_APP_API_URL}/post/${id}/delete`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies for authentication
      });
      console.log(data)
  
    //   console.log(" comment loaded:", data.message);
  
      dispatch({ type: "deletePostSuccess", payload: data.message });
    } catch (error) { 
      const errorMessage = "Failed to get following posts.";  
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "deletePostFailure", payload: error.response?.data?.message || error.message }); 
    }
  };

  