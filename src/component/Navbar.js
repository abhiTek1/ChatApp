import React,{useState} from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiLogoutBoxFill } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import View from './View';


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
   <Modal className='modal-box' show={show} onHide={handleClose}>
        <Modal.Header className='modal-head' closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'> <View/></Modal.Body>
       
      </Modal>
    
    <div className='  Navbar'>
    <span className='logo'>
    
              <img onClick={handleShow}  src={currentUser.photoURL} alt=''/>

    <h1 className="lg-text2">TalkTastic</h1>
    </span>
    <div className='user'>
    <RiLogoutBoxFill/>   
          <button onClick={()=>signOut(auth)}>logOut</button>

    </div>
    </div>
    </>
  )
}

export default Navbar;