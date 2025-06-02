import { Avatar, Button, Typography } from "@mui/material"
import {  useNavigate } from "react-router-dom"
import './UpdateProfile.css'
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../actions/User";
import Loader from "./Loader";


function UpdateProfile() {

  const {loading,error,user}=useSelector((state)=>state.user)
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
 
  const[name,setName]=useState(user.name);
  const[email,setEmail]=useState(user.email);
  const [preview, setPreview] = useState(user.avatar.url)
    const[image,setImage]=useState(null)
    const Navigate=useNavigate()
    const dispatch=useDispatch()
    

    const update=async(e)=>{
      e.preventDefault();
      await dispatch(updateProfile(name,email,image))
      dispatch(loadUser())
        toast.success("Account Updated", {
            onClose: () => Navigate('/'), // Navigate after the toast is closed
          });
    }
    const handleImage=(event)=>{
        const file = event.target.files[0];
        if (file) {
          setImage(file);
          setPreview(URL.createObjectURL(file)); // Create a temporary preview URL
      }       
    }

    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch({type:"clearErrors"})
      }
      if (updateError) {
        toast.error(updateError);
        dispatch({ type: "clearErrors" });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: "clearMessage" });
      }
  
    },[dispatch, error, updateError, message])
    
  return (
    <>
   
  {loading ? <Loader/>:(<div className="updateProfile">
    <form className="updateProfileForm">
      <Typography variant="h4" style={{ padding: "1vmax" }}>
        VIBEHIVE
      </Typography>

      <Avatar src={preview} alt="User" sx={{ height: "8vmax", width: "8vmax" }}/>

      <input type="file" accept="image/*" onChange={handleImage} />

      <input type="text"  placeholder="Name" value={name} className="updateProfileInputs" required onChange={(e)=>setName(e.target.value)}/>

      <input type="email" placeholder="Email" value={email} className="updateProfileInputs" required onChange={(e)=>setEmail(e.target.value)} />

      <Button disabled={updateLoading} onClick={update}>Update</Button>
    </form>
    
  </div>)}
    </>
  )
}


export default UpdateProfile