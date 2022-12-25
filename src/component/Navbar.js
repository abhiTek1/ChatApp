import React,{useState} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import View from './View';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <View/>
      </Modal>
    <div className='  Navbar'>
    <div className='logo'>
    <img onClick={handleShow} src={currentUser.photoURL} alt=''/>
              <Link to="/home">
                <h1 className="lg-text">TalkTastic</h1>
                <p className="lg-slogan">connect with the world</p>
              </Link>
            </div>
    <div className='user'>
    
        {/* <span >{currentUser.displayName}</span> */}
        <button onClick={()=>signOut(auth)}>logOut</button>
    </div>
    </div>
    </>
  )
}

export default Navbar;
