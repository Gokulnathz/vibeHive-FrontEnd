import { Link } from 'react-router-dom'
import './Home.css'
import { Typography } from '@mui/material'

function User({userId,name,avatar}) {
  
  return (
    <>
      <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography>{name}</Typography>
    </Link>
    </>
  )
}

export default User