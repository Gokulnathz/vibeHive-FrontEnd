import Post from './Post'
import User from './User'
import './Home.css'
import { useEffect, useState } from 'react'
import { getAllUsers, getFollowingPosts } from '../actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';

console.log("react api url",import.meta.env.REACT_APP_API_URL);

function Home() {

  const dispatch=useDispatch();
  
  const { user } = useSelector((state) => state.user);

  const{loading,posts,error}=useSelector(state=>state.postOfFollowing);

  const{users,loading:userLoading}=useSelector(state=>state.allUsers);

  const {error:likeError,message}= useSelector(state=>state.like);
  const [showUsers, setShowUsers] = useState(false);
  
  useEffect(()=>{
   dispatch(getFollowingPosts())
   dispatch(getAllUsers())
  },[dispatch])

  useEffect(()=>{
    if(likeError){
      toast.error(likeError);
      dispatch({type:"clearErrors"});
    }
    if(message){
      toast.success(message);
      dispatch({type:"clearMessage"});
    }
  },[error,message,likeError,dispatch])

  return (
    <>
  {
    loading || userLoading ? (
      <Loader />
    ) : (
      <div className="home">
        <div className="toggle-btn-wrapper">
    <button
      className="toggle-users-btn"
      onClick={() => setShowUsers(prev => !prev)}
      title={showUsers ? "Hide Users" : "Show Users"}
    >
      <PersonIcon fontSize="small" />
    </button>
  </div>
         
        <div className="homeleft scrollable-div">
          {posts && posts.map(post => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post?.likes}
              comments={post?.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post?.owner?.name}
              ownerId={post?.owner?._id}
              isAccount={post?.owner?._id === user._id}
            />
          ))}
        </div>

       

        {/* Conditionally render homeright based on screen size and toggle */}
        <div className={`homeright scrollable-div ${showUsers ? 'show' : 'hide'}`}>
          {users && users.length > 0 ? (
            users.map(user => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user?.avatar?.url}
              />
            ))
          ) : (
            <Typography>No Users Found</Typography>
          )}
        </div>
      </div>
    )
  }
</>

    
  )
}

export default Home