import { Avatar, Button, Dialog, Typography } from "@mui/material";
import Post from "./Post"
import User from "./User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser, getMyPosts, getUserPosts, getUserProfile } from "../actions/User";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


function UserProfile() {
    const [following, setFollowing] = useState(false);
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const {user:me}=useSelector((state)=>state.userProfile);
    const {loading,error,posts}=useSelector((state)=>state.userPost);
    const {user:loggedIn,loading:userLoading,error:userError}= useSelector(state=>state.user);
    const {error:followError,message,loading:followLoading}=useSelector((state)=>state.like);

    const [myProfile,setMyProfile]=useState(false);
    const params= useParams();

    console.log("Me :",me)
   
    const dispatch = useDispatch();
    
    const followHandler = async() => {
        setFollowing(!following);
       await dispatch(followAndUnfollowUser(me._id));
       dispatch(getUserProfile(params.id)) 
      };

      useEffect(()=>{

        dispatch(getUserPosts(params.id))
        dispatch(getUserProfile(params.id))
       

      },[dispatch,params.id]);

      useEffect(()=>{
        if (me && loggedIn) {
          // Check if the logged-in user is a follower of the viewed user (me)
          const isFollowing = me.followers?.some(follower => follower._id === loggedIn._id);
          setFollowing(isFollowing);
          
          // Set if profile belongs to the logged-in user
          setMyProfile(loggedIn._id === me._id);
        }
        else{
            setFollowing(false)
        }

      },[me,loggedIn]);

      useEffect(()=>{
        if(error)
        {
          toast.error(error);
        dispatch({type: "clearErrors"});
        }
        if(followError)
        {
          toast.error(error);
        dispatch({type: "clearErrors"});
        }
        if(userError)
        {
          toast.error(error);
        dispatch({type: "clearErrors"});
        }
      },[error,dispatch,followError,message,userError])
  return (
    <>
   
    <div className="account">
      <div className="accountleft scrollable-div">
      {
          posts && posts.length>0 ?  posts.map(post=>(  
            <Post key={post._id}
            postId={post._id}
            caption={post?.caption}
            postImage={post?.image.url}
            likes={post?.likes}
            comments={post?.comments}
            ownerImage={post?.owner?.avatar.url}
            ownerName={post?.owner?.name}
            ownerId={post?.owner?._id}
            />
        )):<Typography variant='h6'>No Posts to show</Typography>}
      </div>
       <div className="accountRightContainer">
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} >
             ☰
            </button>
     <div className={`accountright ${menuOpen ? "show" : ""}`}>
       
            <Avatar
              src={me?.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{me?.name}</Typography>
            <div className="accountStats">
               <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography variant="h6">{me?.followers?.length}</Typography>
            </div>

            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography variant="h6">{me?.following?.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
                <Typography variant="h6">{posts?.length}</Typography>
            </div>
            </div>

           

            
              { myProfile ?null:
               ( < Button
                variant="contained"
                style={{ background: following ? "red" : "blue" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>)}
           
        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
                <User userId={me?.followers[0]?._id} name={me?.followers[0]?.name} avatar={me?.followers[0]?.avatar.url}/>             
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

                <User/>
                  
          </div>
        </Dialog>
      </div>
      </div>
    </div>
    </>
  )
}

export default UserProfile