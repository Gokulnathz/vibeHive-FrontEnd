
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Header from './components/Header'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { loadUser } from './actions/User'

import Home from './components/Home'
import Account from './components/Account'
import NewPost from './components/NewPost'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import UserProfile from './components/UserProfile'
import Search from './components/Search'
import UpdateProfile from './components/UpdateProfile'
import { useEffect } from 'react'
import { loadUser } from './actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import UpdatePassword from './components/UpdatePassword'
import NotFound from './components/NotFound'



function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    
    dispatch(loadUser())
  },[dispatch]);
 
const {isAuthenticated}= useSelector((state)=>state.user);

  return (
    <>
    {isAuthenticated &&  <Header/> }
   
    <Routes>
    <Route path='/' element={isAuthenticated ? <Home/>: <Login/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/account' element={isAuthenticated ?<Account/>: <Login/>}></Route>
    <Route path='/newpost' element={isAuthenticated ?<NewPost/>: <Login/>}></Route>
    <Route path='/forgotpassword' element={isAuthenticated?<Home/>:<ForgotPassword/>}></Route>
    <Route path='/password/reset/:token' element={isAuthenticated?<UpdatePassword/>: <ResetPassword/>}></Route>
    <Route path='/user/:id' element={<UserProfile/>}></Route>
    <Route path='/search' element={<Search/>}></Route>
    <Route path='/updateprofile' element={isAuthenticated ?<UpdateProfile/>:<Login/>}></Route>
    {/* <Route path='/*' element={isAuthenticated ? <Home/>: <Login/>}></Route> */}
    <Route path='/updatepassword' element={isAuthenticated ?<UpdatePassword/>:<Login/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    <ToastContainer position="top-center" />
    </>
  )
}

export default App
