import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from "./navBar.module.css"
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../service/slice';

function NavBar() {
    const [isAuthenticated, setIsActivated] = useState(true);
    const navigate = useNavigate();
        const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/'); 
      };

  return (
    <nav className={styles.navbar}>
      {/* <Link to="/account" className={styles.link}><AccountCircleIcon/> Account</Link> */}
      <Link to="/list" className={styles.link}><ChatIcon/>  Chats</Link>
      {isAuthenticated ? (
        <button onClick={handleLogout} className={styles.button}> <LogoutIcon/> Logout</button>
      ) : (
        <Link to="/login" className={styles.link}><LoginIcon/> Login</Link> 
      )}
    </nav>
  )
}

export default NavBar