import React, { useContext, useState } from "react";
import { FaTelegramPlane } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import EmojiPicker from 'emoji-picker-react';
import Picker from 'emoji-picker-react';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
 

const onEmojiClick = (event, emojiObject) => {
  setText(prevInput => prevInput + emojiObject.emoji);
  
};

  const handleSend = async () => {
    if (img ) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef,img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
               
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } 
    // else if (img1 ) {
    //   // console.log("img",img1)
    //   const storageRef1 = ref(storage, uuid());

    //   const uploadTask1 = uploadBytesResumable(storageRef1,img1);

    //   uploadTask1.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask1.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
               
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img1: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // } 

   
    else {
      
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <>
     <Modal className="emoji-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select emoji</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Picker  onEmojiClick={(emojiObject)=> setText((prevMsg)=> prevMsg + emojiObject.emoji)} />
        </Modal.Body>
      </Modal>
    <div className="input">
      <input
        type="text" 
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
      {/* <EmojiPicker /> */}
        <img src={Attach} alt="" onClick={handleShow}/>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
          
        </label>
        <button onClick={handleSend}><FaTelegramPlane/></button>
      </div>
    </div>
    </>
  );
};

export default Input;