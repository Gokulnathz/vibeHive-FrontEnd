import { Avatar, Button, Dialog, Typography } from '@mui/material'
import './Account.css'
import Post from './Post'

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile, getMyPosts, logoutUser } from '../actions/User';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { persistor } from "../store";

function Account() {
    const[followersToggle,setFollowersToggle]=useState(false);
    const[followingToggle,setFollowingToggle]=useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,error,posts}=useSelector(state=>state.myPosts);
    const {user,loading:userLoading,error:loginError}= useSelector(state=>state.user);
    const {
      error: likeError,
      message,
      loading: deleteLoading,
    } = useSelector((state) => state.like);

    const logoutHandler=async()=>{
       await dispatch(logoutUser());
       await persistor.purge();
       localStorage.removeItem("persist:root");
       toast.success("Logged out successfully");
       // Use setTimeout to ensure Redux updates before reload
       setTimeout(() => {
         navigate('/'); 
         window.location.reload(); // Full reload to clear any remaining data
       }, 500);
    }

    const deleteProfileHandler=async()=>{
      await dispatch(deleteProfile());
      await dispatch(logoutUser());
      setTimeout(() => {
        navigate('/'); 
        window.location.reload(); // Full reload to clear any remaining data
      }, 100);
      
    }
   
    useEffect(()=>{
      if (!userLoading && user._id) {
    dispatch(getMyPosts(user._id));
  }
    },[dispatch,user?._id,userLoading])  

    useEffect(() => {
     
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (loginError) {
        toast.error(loginError);
        dispatch({ type: "clearErrors" });
      }
      if (likeError) {
        toast.error(likeError);
        dispatch({ type: "clearErrors" });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: "clearMessage" });
      }
    },[error,message,likeError,loginError,dispatch])


  return (
    <>  
    {
      loading === true|| userLoading===true ?(<Loader/>):(
        <div className="account">
        <div className="accountleft scrollable-div">
           { posts && posts.length>0 ? posts.map((post) => (
             post?.owner ?(<Post 
              key={post._id}
              postId={post._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner?.avatar?.url||Avatar}
              ownerName={post?.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
             />): (
              <Typography key={post._id} variant="body2" color="textSecondary">
                Post data is incomplete.
              </Typography>
            )
           )):<Typography variant='h6'>No Posts to show</Typography>
            }
        </div>
        
        
          <div className="accountRightContainer">
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} >
             ☰
            </button>
             <div className={`accountright ${menuOpen ? "show" : ""}`}>
              <Avatar src={user?.avatar?.url}/>
             <Typography variant="h5">{user?.name}</Typography>
             <div className="accountStats">
            <div>
          <button onClick={() => setFollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user?.followers?.length}</Typography>
          </div>
          <div>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user?.following?.length}</Typography>
        </div>   
          <div>
          <Typography>Posts</Typography>
          <Typography>{posts?.length}</Typography>
        </div>
         </div>
        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to="/updateprofile">Edit Profile</Link>
        <Link to="/updatepassword">Change Password</Link>
        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }} onClick={deleteProfileHandler} disabled={deleteLoading}>
          Delete My Profile
        </Button>
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
                {user?.followers?.length > 0 ? (
      user.followers.map((follower) => (
        <User
          key={follower._id}
          userId={follower._id}
          name={follower.name}
          avatar={follower.avatar?.url}
        />
      ))
    ) : (
      <Typography>No followers yet</Typography>
    )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
                {user?.following?.length > 0 ? (
      user.following.map((following) => (
        <User
          key={following._id}
          userId={following._id}
          name={following.name}
          avatar={following.avatar?.url}
        />
      ))
    ) : (
      <Typography>No followers yet</Typography>
    )}
          </div>
        </Dialog>
             </div>
             
          </div>
       
        </div>
    
      )
    }
    </>
    
  )
}

export default Account