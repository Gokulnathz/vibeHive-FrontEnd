import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Delete } from "@mui/icons-material";

import './CommentCard.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../actions/Post";
import { getFollowingPosts, getMyPosts } from "../actions/User";


function CommentCard({ userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,}) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log("Is account",isAccount)

    const deleteCommentHandler=async()=>{
      await dispatch(deleteCommentOnPost(postId,commentId))
      if(isAccount){
        dispatch(getMyPosts(user._id));
      }else{
        dispatch(getFollowingPosts());
      }
    }
    
  return (
    <div className="commentUser">
    <Link to={`/user/${userId}`}>
      <img src={avatar} alt={name} />
      <Typography style={{ minWidth: "7vmax" }}>{name}</Typography>
    </Link>
    {comment ?(<Typography>{comment}</Typography>):<Typography>No comments yet</Typography>}

   
     { isAccount || userId === user._id ?(<Button onClick={deleteCommentHandler}>
        <Delete />
      </Button>) : null}
    
  </div>
  )
}

export default CommentCard