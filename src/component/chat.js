import React, { useContext } from "react";
import { FcVideoCall } from 'react-icons/fc';
import { HiUserAdd } from 'react-icons/hi';
import {BsThreeDots } from 'react-icons/bs';

import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Massages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
      <div className="div">
        <img src={data.user.photoURL}/>
        <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <FcVideoCall style={{fontSize: "1.5em",color:"red"}}/>
         <HiUserAdd  style={{fontSize: "1.5em",color:"green"}}/>
          <BsThreeDots  style={{fontSize: "1.5em",color:"green"}}/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
