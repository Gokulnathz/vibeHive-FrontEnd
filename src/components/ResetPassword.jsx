import { Button, Typography } from '@mui/material'
import './ResetPassword.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { resetPassword } from '../actions/User'


function ResetPassword() {

    const [newPassword, setNewPassword]=useState(" ");
    const {error,loading,message}= useSelector((state)=>state.like)
    const params= useParams();


    const dispatch= useDispatch();
   const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(resetPassword(params.token,newPassword))
        
      }
  return (
    <>
    
    <div className="resetPassword">
      <form className="resetPasswordForm">
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          VibeHive
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="resetPasswordInputs"
          onChange={(e)=>setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgotpassword">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} className='' type="submit" onClick={submitHandler}>
          Reset Password
        </Button>
      </form>
    </div>
    </>
  )
}

export default ResetPassword