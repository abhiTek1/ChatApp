import React from 'react';
import Add from  '../img/addAvatar.png';

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src={Add} alt="" />
        <div className="userChatInfo">
          <span> rajesh</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Add} alt="" />
        <div className="userChatInfo">
          <span> rajesh</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Add} alt="" />
        <div className="userChatInfo">
          <span> rajesh</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={Add} alt="" />
        <div className="userChatInfo">
          <span> rajesh</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats;
