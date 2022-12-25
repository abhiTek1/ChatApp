import React, { useContext, useState } from "react";
import { FaTelegramPlane } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
// import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Picker from 'emoji-picker-react';
import { BiImage } from "react-icons/bi";
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
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
      <Picker  onEmojiClick={(emojiObject)=> setText((prevMsg)=> prevMsg + emojiObject.emoji)} />
      </Modal.Header>
      </Modal>
    <div className="input">
      <input
        type="text" 
        multiline
        rows={5}
        autoComplete="on"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
      {/* <EmojiPicker /> */}
        <img src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" alt="" onClick={handleShow}/>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src="https://icons.getbootstrap.com/assets/icons/image.svg" alt="" />
           
        </label>
        <img src="https://icons.getbootstrap.com/assets/icons/arrow-right-square-fill.svg" onClick={handleSend} />
      </div>
    </div>
    </>
  );
};

export default Input;