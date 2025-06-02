import { Avatar, Button, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import './Register.css'
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/User";

function Register() {
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [preview, setPreview] = useState(null)
    const[image,setImage]=useState(null)
    const Navigate=useNavigate()
    const dispatch=useDispatch()
    const {loading,error}=useSelector((state)=>state.user)

    const create=()=>{
      dispatch(registerUser(name,email,password,image))
        toast.success("Account Created", {
            onClose: () => Navigate('/'), // Navigate after the toast is closed
          });
    }
    const handleImage=(event)=>{
        const file = event.target.files[0];
        console.log("File:",file);
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
    },[dispatch,error])
    
  return (
    <>
   
    <div className="register">
      <form className="registerForm">
        <Typography variant="h4" style={{ padding: "2vmax" }}>
          VIBEHIVE
        </Typography>

        <Avatar src={preview} alt="User" sx={{ height: "8vmax", width: "8vmax" }}/>

        <input type="file" accept="image/*" onChange={handleImage} />

        <input type="text"  placeholder="Name" className="registerInputs" required onChange={(e)=>setName(e.target.value)}/>

        <input type="email" placeholder="Email" className="registerInputs" required onChange={(e)=>setEmail(e.target.value)} />

        <input type="password" placeholder="Password" className="registerInputs" required onChange={(e)=>setPassword(e.target.value)}/>

        <Link to="/">
          <Typography>Already Signed Up? Login Now</Typography>
        </Link>

        <Button disabled={loading} onClick={()=>{create()}}>Sign Up</Button>
      </form>
      
    </div>
    </>
  )
}

export default Register