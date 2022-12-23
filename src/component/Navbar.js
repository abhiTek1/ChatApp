import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='Navbar'>
    <span className='logo'>Web Chat</span>
    <div className='user'>
    <img src={currentUser.photoURL} alt=''/>
        <span >{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logOut</button>
    </div>
    </div>
  )
}

export default Navbar;
