import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../Firebase";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Chats = () => {
  const [chats, setChats] = useState([]);
   const Navigate= useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    
   
  };
  const handleMobile=()=>{
    Navigate("/chat");
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        
        <div
        
          className="container"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <div className="in-container">
          <div className="navimg">
          <img src={chat[1].userInfo.photoURL} alt=""  onError={(event) => event.target.style.display = 'none'} />

          </div>

        
          <div className="userChatInfo">
         

            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
          </div>
          <div  onClick={()=>handleMobile()}
          className="mob-view">
            <MdArrowForwardIos/>
               </div> 
        </div>
        
      ))}
    </div>
  );
};

export default Chats;