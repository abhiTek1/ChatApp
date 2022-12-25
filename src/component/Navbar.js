import React,{useState} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <View/>
      </Modal>
    
    <div className='  Navbar'>
    <span className='logo'>Web Chat</span>
    <div className='user'>
    <img onClick={handleShow}  src={currentUser.photoURL} alt=''/>
        <span >{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logOut</button>
    </div>
    </div>
    </>
  )
}

export default Navbar;
