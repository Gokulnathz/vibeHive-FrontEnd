import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { Home,HomeOutlined,Add,AddOutlined,SearchOutlined,Search,AccountCircle, AccountCircleOutlined }
 from '@mui/icons-material'

import logoSm from '../assets/vibeHivesmall.jpg'

function Header() {
    const tab = useLocation(); // to get the current route path
  return (
    <>
    <div className="header">
     <img  src={logoSm} alt="" /> 
    <Link to='/'>
    {tab.pathname ==='/'? <Home style={{color:"black"}}/>:<HomeOutlined/>}    
    </Link> 
    <Link to='/newpost'>
    {tab.pathname ==='/newpost'? <Add style={{color:"black"}}/>:<AddOutlined/>}
    </Link>
    <Link to='/search'>
    {tab.pathname ==='/search'? <Search style={{color:"black"}}/>:<SearchOutlined/>}
    </Link>
    <Link to='/account'>
    {tab.pathname ==='/account'? <AccountCircle style={{color:"black"}}/>:<AccountCircleOutlined/>}
    </Link>
    
    </div>
   
    </>
  )
}

export default Header