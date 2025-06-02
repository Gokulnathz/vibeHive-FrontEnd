
import { Button, Typography } from '@mui/material'
import './updatePassword.css'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../actions/User';
import { toast } from 'react-toastify';

function UpdatePassword() {
    const[oldPassword,setOldPassword]=useState('');
    const[newPassword,setNewPassword]=useState(''); 
    const dispatch=useDispatch();
    
    const { error, loading, message } = useSelector((state) => state.like);
    const submitHandler=async(e)=>{
      e.preventDefault()
        await dispatch (updatePassword(oldPassword,newPassword))  
    }
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: "clearMessage" });
      }
    }, [ error, dispatch, message]);
      
    return (
        
        <div className="updatePassword">
        <form className="updatePasswordForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            VibeHive
          </Typography>
  
          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
  
          <Button disabled={loading} type="submit">
            Change Password
          </Button>
        </form>
      </div>
    )
  
}

export default UpdatePassword