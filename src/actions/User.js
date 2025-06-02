import axios from "axios"
import { persistor } from "../store";



export const loginUser=(email,password)=>async(dispatch)=>{
    try{
        dispatch({
            type:"loginRequest"
        })
        const {data}= await axios.post(`${import.meta.env.REACT_APP_API_URL}/login`,{email,password},{withCredentials: true},{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch({ type:"loginSuccess", payload:data.user})
    }catch(error){
        
        dispatch({
            type:"loginFailure",
            payload:{message: error.response?.data?.message || error.message,
                status: error.response?.status || "Unknown",},
        })
    }
}
export const loadUser=()=>async(dispatch)=>{
    try{
        
        dispatch({
            type:"loadUserRequest"
        })
        const {data}= await axios.get(`${import.meta.env.REACT_APP_API_URL}/my/profile`,{ withCredentials: true,});
        
        dispatch({ type:"loadUserSuccess", payload:data.user})

    }catch(error){
        
        dispatch({
            type:"loadUserFailure",
            payload: {
                message: error.response?.data?.message || error.message,
                status: error.response?.status || "Unknown",
            },
        })
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({ type: "postOfFollowingRequest" });

  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/posts`, { withCredentials: true });
  
      dispatch({ type: "postOfFollowingSuccess", payload: data.posts });
    } catch (error) {
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "postOfFollowingFailure", payload: error.response?.data?.message || error.message });
    }
  };
export const getAllUsers = (name="") => async (dispatch) => {
    try {
      dispatch({ type: "allUsersRequest" });

  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/users?name=${name}`, { withCredentials: true });
  
      dispatch({ type: "allUsersSuccess", payload: data.users });
    } catch (error) {
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "allUsersFailure", payload: error.response?.data?.message || error.message });
    }
  };

  export const getMyPosts = (id) => async (dispatch) => {
    try {
      dispatch({ type: "myPostRequest" });
  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/mypost/${id}`, { withCredentials: true });
      console.log("API Response for /mypost:", data);
      dispatch({ type: "myPostSuccess", payload: data.posts });

    } catch (error) {    
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "myPostFailure", payload: error.response?.data?.message || error.message });
    }    
  };

  export const logoutUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LogoutUserRequest"
        })
        console.log('Logout action')
        await axios.get(`${import.meta.env.REACT_APP_API_URL}/logout`,{withCredentials: true});
        
        dispatch({ type:"LogoutUserSuccess"})
        persistor.purge();
        localStorage.clear(); // Clear local storage
    }catch(error){
        
        dispatch({
            type:"LogoutUserFailure",
            payload:{message: error.response?.data?.message || error.message,
                status: error.response?.status || "Unknown",},
        })
    }
}

export const registerUser=(name,email,password,avatar)=>async(dispatch)=>{
  try{

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
      dispatch({
          type:"registerRequest"
      })
      const {data}= await axios.post(`${import.meta.env.REACT_APP_API_URL}/register`,formData,{withCredentials: true},{
          headers:{
              "Content-Type":"multipart/form-data"
          }
      });
      dispatch({ type:"registerSuccess", payload:data.user})
  }catch(error){
      
      dispatch({
          type:"registerFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}
export const updateProfile=(name,email,avatar)=>async(dispatch)=>{
  try{
        console.log("redux Action");
        console.log("name: ",name);
        console.log("avatar ",avatar);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar instanceof File) {  // Ensure it's a File object
        formData.append('avatar', avatar);
      } else {
        console.error("Invalid avatar format");
      }
    
      dispatch({
          type:"updateProfileRequest"
      })
      const {data}= await axios.put(`${import.meta.env.REACT_APP_API_URL}/update/profile`,formData,{withCredentials: true,
          headers:{
              "Content-Type":"multipart/form-data"
          },
      });
      console.log("API ",data)
      dispatch({ type:"updateProfileSuccess", payload:data.user})
  }catch(error){
      
      dispatch({
          type:"updateProfileFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}
export const updatePassword=(oldPassword,newPassword)=>async(dispatch)=>{
  try{
       console.log("update password action");
      dispatch({
          type:"updatePasswordRequest"
      })
      const {data}= await axios.put(`${import.meta.env.REACT_APP_API_URL}/update/password`,{oldPassword,newPassword},{withCredentials: true,
          headers:{
              "Content-Type":"application/json"
          },
      });
      console.log("API ",data)
      dispatch({ type:"updatePasswordSuccess", payload:data.message})
  }catch(error){
      
      dispatch({
          type:"updatePasswordFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}
export const deleteProfile=()=>async(dispatch)=>{
  try{
       console.log("delete profile action");
      dispatch({
          type:"deleteProfileRequest"
      })
      const {data}= await axios.delete(`${import.meta.env.REACT_APP_API_URL}/delete/profile`,{withCredentials: true,
          headers:{
              "Content-Type":"application/json"
          },
      });
      console.log("API ",data)
      dispatch({ type:"deleteProfileSuccess", payload:data.message})
  }catch(error){
      
      dispatch({
          type:"deleteProfileFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}
export const forgotPassword=(email)=>async(dispatch)=>{
  try{
       
      dispatch({
          type:"forgotPasswordRequest"
      })
      const {data}= await axios.post(`${import.meta.env.REACT_APP_API_URL}/forgot/password`,{email},{withCredentials: true,
          headers:{
              "Content-Type":"application/json"
          },
      });
      console.log("API ",data)
      dispatch({ type:"forgotPasswordSuccess", payload:data.message})
  }catch(error){
      
      dispatch({
          type:"forgotPasswordFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}

export const resetPassword=(token,password)=>async(dispatch)=>{
  try{
       
      dispatch({
          type:"resetPasswordRequest"
      })
      const {data}= await axios.put(`${import.meta.env.REACT_APP_API_URL}/password/reset/${token}`,{password},{withCredentials: true,
          headers:{
              "Content-Type":"application/json"
          },
      });
      console.log("API ",data)
      dispatch({ type:"restPasswordSuccess", payload:data.message})
  }catch(error){
      
      dispatch({
          type:"resetPasswordFailure",
          payload:{message: error.response?.data?.message || error.message,
              status: error.response?.status || "Unknown",},
      })
  }
}

export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({ type: "userPostRequest" });
  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/userpost/${id}`, { withCredentials: true });
      dispatch({ type: "userPostSuccess", payload: data.posts });

    } catch (error) {    
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "userPostFailure", payload: error.response?.data?.message || error.message });
    }    
  };

  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({ type: "userProfileRequest" });
  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/user/${id}`, { withCredentials: true });
      
      dispatch({ type: "userProfileSuccess", payload: data.user });

    } catch (error) {    
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "userProfileFailure", payload: error.response?.data?.message || error.message });
    }    
  };

  export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: "followUserRequest" });
  
      const { data } = await axios.get(`${import.meta.env.REACT_APP_API_URL}/follow/${id}`, { withCredentials: true });
      dispatch({ type: "followUserSuccess", payload: data.message });

    } catch (error) {    
      const errorMessage = "Failed to get following posts.";
      console.error("Get posts error:", errorMessage);
  
      dispatch({ type: "followUserFailure", payload: error.response?.data?.message || error.message });
    }    
  };

