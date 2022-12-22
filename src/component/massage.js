import React from 'react'
import Add from  '../img/addAvatar.png';
const massage = () => {
  return (
    <div className='message owner'>
     <div className="messageInfo">
        <img
          src={
            Add
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p> text</p>
          {/* <img src={Add } alt="" /> */}
      </div>
    </div>
    
  )
}

export default massage;
