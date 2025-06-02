import { Button, Typography } from '@mui/material'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

 import logo from '../assets/vibeHive.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/User';
import { toast } from 'react-toastify';

function Login() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState(''); 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isAuthenticated,error:loginError}= useSelector((state)=>state.user);
  
  const LoginHandler=async(e)=>{
    e.preventDefault();
     await dispatch(loginUser(email,password))
  }

  useEffect(() => {
    //console.log("Authentication Status:", isAuthenticated);
    if (isAuthenticated) {
      toast.success("Login Success");
      navigate('/');
    }
    else{
      toast.error("Please Login")
    }
    if (loginError) {
      console.log(loginError.message);
      dispatch({ type: "clearErrors" });
    }
   
  }, [isAuthenticated,loginError, dispatch, navigate]);
    
  return (
    <>
    <div className="login">
    <div>
      <figure>
      <img src={logo} alt="logo" className='max-w-full h-auto' />
      <figcaption className='text-center font-bold mb-5'>Share Moments Spark Connections</figcaption>
      </figure>
    </div>
  <div> 
      <form className="loginForm bg-white shadow-md rounded-lg" onSubmit={LoginHandler}>
            <Typography variant='h3' style={{padding:"2vmax"}}>VibeHive</Typography>
            <input type="email" placeholder='email' required onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder='password' required onChange={(e)=>setPassword(e.target.value)}/>
            <Link to="/forgotpassword" >
            <Typography>Forgot Password</Typography>
            </Link>
           <Button type="submit">Login</Button> 
            <Link to="/register">
            <Typography>New User ?</Typography>
            </Link>
        </form>
        </div>
        <div className="col-span-1 md:col-span-1"></div>
        </div>
    </>
  )
}

export default Login