import { Button, Typography } from "@mui/material"
import './NewPost.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../actions/Post";

import { loadUser } from "../actions/User";
import { toast } from 'react-toastify';
import { useRef } from "react";


function NewPost() {
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch();
    // const alert=useAlert();
    const fileInputRef = useRef(null);
    
    const {loading,error,message}= useSelector((state)=>state.like)
    const handleImageChange=(e)=>{
     
      const file = e.target.files[0];

      if (file) {
        setImage(file); // Directly store the File object
      }
    }
    const submitHandler=(e)=>{
      console.log("submit handler")
      e.preventDefault();
      if (!image && caption.trim() === "") {
      toast.warning("Please provide an image or a caption.");
      return;
      }
      dispatch(createNewPost(caption,image));
      dispatch(loadUser());
      toast.success("post created");
      
    }
    useEffect(()=>{
      if (error)
      {  toast.error(error);
      dispatch({type:"clearErrors"})}
      if(message)
      {
        toast.success(message);
        dispatch({type:"clearMessage"})
         setImage(null);
      setCaption('');

      if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

      }
      
   
    
    },[error,message,dispatch])
  return (
    <>
  
     <div className="newPost">
    <form className="newPostForm" onSubmit={submitHandler}>
      <Typography variant="h4">Create New Post</Typography>

      {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef}/>
      
      <input
        type="text" placeholder="Enter the Caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
      <Button  type="submit" disabled={loading}>
        Post
      </Button>
    </form>
  </div>
    </>
   
  )
}

export default NewPost