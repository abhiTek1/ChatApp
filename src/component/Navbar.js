import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='  Navbar'>
    <div className='logo'>
              <Link to="/home">
                <h1 className="lg-text">TalkTastic</h1>
                <p className="lg-slogan">connect with the world</p>
              </Link>
            </div>
    <div className='user'>
    <img src={currentUser.photoURL} alt=''/>
        <span >{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logOut</button>
    </div>
    </div>
  )
}

export default Navbar;
