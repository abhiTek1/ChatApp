import React, { useContext } from "react";
import Messages from "./Massages";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
    
      <Messages />
      
     
    </div>
  );
};

export default Chat;
