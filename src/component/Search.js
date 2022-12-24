import React from "react";
import Add from  '../img/addAvatar.png';

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" />
      </div>

      <div className="userChat">
        <img src={Add} alt="" />
        <div className="userChatInfo">
          <span> rajesh</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
