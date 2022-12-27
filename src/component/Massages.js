import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { db } from "../Firebase";
import Input from "./Input";
import Message from "./massage";

import Add from "../img/add.png";
import More from "../img/more.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const Navigate = useNavigate();


  const handleBack=()=>{
    Navigate("/home");
    console.log("ho gaya");
  }


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);


  return (
    <>
    
      <div className="chatInfo">
        <div className="div" onClick={()=>handleBack()} >
        <div className="inner-chatInfo" >
        <Link ><AiOutlineArrowLeft/></Link>
          <img src={data.user.photoURL} />
          <span>{data.user?.displayName}</span>
        </div>
        </div>
        <div className="chatIcons">
          {/* <img src={Cam} alt="" /> */}
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
      <Input />
    </>
  );
};

export default Messages;