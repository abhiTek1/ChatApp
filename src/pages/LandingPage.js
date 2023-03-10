import React from "react";
import "./LandingPage.css";
import HI from "../img/home.gif";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="nav">
          <div className="logo">
            <div className="wave-container">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>  
              <div className="wave"></div>
            </div>

            <div>
              <h1 className="lg-text">TalkTastic</h1>
              <p className="lg-slogan">connect with the world</p>
            </div>
          </div>

        
        </div>

        <div className="down-wrapper">
          <div className="left-div">
       
            <div className="para">
            
              <p>
              <h1>About us:</h1>
              Talktastic is a web chat app that allows users to easily connect and communicate with each other in real-time. Whether you're looking to catch up with friends, have a group discussion, or just want to chat with someone new, Talktastic has you covered. With its simple and user-friendly interface, you can start chatting in just a few clicks. Plus, Talktastic is available on all devices, so you can take your conversations with you wherever you go. Try Talktastic today .
            
              </p>
            </div>
            <div className=" start-btn">
              <NavLink className="nav-btn " to="/SignUp">
                Get Started
              </NavLink>
            </div>
          </div>
          <div className="right-div">
            <img className="home-img" src={HI} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
 
