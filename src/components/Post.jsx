import { Avatar, Button, Typography,Dialog } from '@mui/material';

import './Post.css'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
  } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, deletePost, likePost, updatePost } from '../actions/Post';
import { getFollowingPosts, getMyPosts, loadUser } from '../actions/User';
import User from './User';


function Post({postId,caption,postImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete=false,isAccount=false}) {
    
    const[like,setLike]=useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const[commentValue,setCommentValue]=useState('');
    const[commentToggle,setCommentToggle]=useState(false);
    const[captionValue,setCaptionValue]=useState(caption);
    const[captionToggle,setCaptionToggle]=useState(false);
    const [likesCount, setLikesCount] = useState(likes.length);
    const [likeLoading, setLikeLoading] = useState(false);

    const { user } = useSelector((state) => state.user);

    const dispatch=useDispatch();
    
    const handleLike=async()=>{
      
      //   setLike(!like); 
      //  await dispatch(likePost(postId))
      //  if (isAccount) {
      //   dispatch(getMyPosts)
      // } else {
      //   dispatch(getFollowingPosts());
      // }
      if (likeLoading) return;
    setLikeLoading(true);

    const updatedLike = !like;
    setLike(updatedLike);
    setLikesCount((prev) => (updatedLike ? prev + 1 : prev - 1));

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts(user._id));
    } else {
      dispatch(getFollowingPosts());
    }

    setLikeLoading(false);
        
    }
    const addCommentHandler=async(e)=>{
      e.preventDefault(); 
      await dispatch(addCommentOnPost(postId,commentValue));
      if (isAccount) {
        dispatch(getMyPosts(user._id))
      } else {
        dispatch(getFollowingPosts());
      }
    }

    const updateCaptionHandler=(e)=>{
      e.preventDefault()
      dispatch(updatePost(captionValue,postId))
      dispatch(getMyPosts())
    }

    const deletePostHandler=async()=>{
      await dispatch(deletePost(postId))
      dispatch(getMyPosts(user._id));
      dispatch(loadUser());
    }
    
 useEffect(() => {
  likes.forEach((item) => {
    if (item._id === user._id) {
      setLike(true);
    }
  });
}, [likes, user]);


  // useEffect(()=>{
  //   dispatch(getMyPosts())
  // },[dispatch])


  return (
    <>
    <div className="post">

        <div className="postHeader">
        { isAccount ?
          (<button onClick={()=>setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </button>):null}
          <Dialog
        open={captionToggle}
        onClose={() =>{setCaptionToggle(!captionToggle)}}
      >
        <div className="DialogBox">
          <Typography variant="h4">Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Enter Caption"
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>            
        </div>
      </Dialog>

        </div>
        <img src={postImage} alt="" />
        <div className="postDetails">
            <Avatar src={ownerImage} sx={{
            height: {xs: "25px",sm:"3vmax"},
            width:{xs: "25px" ,sm:"3vmax"}
          }}/>
            <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
          </Link>
          <Typography fontWeight={100} color="rgba(0, 0, 0, 0.582)" style={{ alignSelf: "center" }}>
          {caption}
        </Typography>
        
        </div>

        {/* Likes */}
        <button onClick={()=>setLikesUser(!likesUser)} disabled={likes.length===0? true:false}
        style={{border: "none",backgroundColor: "white",cursor: "pointer",margin: "1vmax 2vmax",}}>
      <Typography>{likesCount} Likes</Typography>
      </button>
      
      <div className="postFooter">
        <Button onClick={()=>handleLike()} >
          {like ?<Favorite style={{color:'red'}} />:<FavoriteBorder/>}
        </Button>

        <Button ><ChatBubbleOutline onClick={()=>setCommentToggle(!commentToggle)}/></Button>

         { isDelete ? <Button onClick={deletePostHandler}> <DeleteOutline /></Button>:null}
           
      </div>
      <Dialog open={likesUser} onClose={()=>{setLikesUser(!likesUser)}}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}

        </div>
      </Dialog>

      {/* comment */}
      <Dialog
        open={commentToggle}
        onClose={() =>{setCommentToggle(!commentToggle)}}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>            
        { comments.length>0 && comments.map((comment) => (
            <CommentCard
              key={comment?._id}
              name={comment?.user?.name}
              avatar={comment?.user?.avatar.url}
              comment={comment?.comment}
              commentId={comment._id}
              postId={postId}
              isAccount={isAccount}
            />
        ))
          }
        </div>
      </Dialog>


    </div>
    </>
  )
}

export default Post
