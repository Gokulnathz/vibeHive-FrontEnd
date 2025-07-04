
import { Button, Typography } from '@mui/material'
import './Search.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/User';
import User from "./User";

function Search() {

    const [name,setName]= useState("");
    const {users,loading:userLoading}=useSelector((state)=>state.allUsers);
    const dispatch= useDispatch();
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(getAllUsers(name));
    }

  return (
  <>
      
     <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h4" style={{ padding: "2vmax" }}>
          VibeHive
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Enter the name of account"
          required 
          onChange={(e)=>setName(e.target.value)}
        />

        <Button disabled={userLoading}  type="submit">
          Search
        </Button>

        <div className="searchResults">
           { users && users.map((user)=>(
            <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} />
           ))

           }
        </div>
      </form>
    </div>
  </>
  )
}

export default Search