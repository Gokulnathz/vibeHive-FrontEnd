import { Button, Typography } from '@mui/material'
import './ForgotPassword.css'
import LockIcon from '@mui/icons-material/Lock';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../actions/User';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {

    const[email,setEmail]=useState('');
    const[tokenRes,setTokenRes]=useState(false);
    const[token,setToken]=useState('');
    const dispatch= useDispatch()
    const {error,loading,message}= useSelector((state)=>state.like)
    const navigate=useNavigate();
    
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(forgotPassword(email))
      
    }
    
    const validate=async()=>{
      try{
        console.log("token inside validate:",token)
        const {data}= await axios.post(`${import.meta.env.REACT_APP_API_URL}/token/validate/${token}`,{withCredentials: true,
            headers:{
                "Content-Type":"application/json"
            },
        });
        console.log("API ",data)
        navigate(`/password/reset/${token}`)
    }catch(error){
          console.log(error);
    }
    }
        
      
     useEffect(() => {
        
        if (message) {
          toast.success(message);
          dispatch({type:"clearErrors"})
          setTokenRes(true);
        }
        if (error) {
          toast.error(error);
          dispatch({ type: "clearErrors" }); // Clear error after displaying it
        }
      }, [error, dispatch,message]);
     

  return (
   <>
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          VibeHive
        </Typography>
        <Typography variant="h5" style={{ padding: "2vmax" }}>
          Trouble with Logging In ?
          <LockIcon/>
        </Typography>

        <input
          type="email"
          value={email}
          placeholder="Enter Emailid"
          required
          onChange={(e)=>setEmail(e.target.value)}
          className="forgotPasswordInputs"
        />

        <Button disabled={loading}  type="submit">
          Send Token
        </Button>
        {
          tokenRes &&(
          <div>
             <input type='text' value={token} placeholder='Enter the token' required onChange={(e)=>setToken(e.target.value)} />
             <Button type="button" onClick={validate}>Validate</Button>
          </div>
        )}
      </form>
    </div>
   </>
  )
}

export default ForgotPassword