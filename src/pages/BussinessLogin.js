import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import "./BussinessLogin.css";
import LI from "../img/login.gif";
import LA from "../img/loganimate.gif";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const passerr="Firebase: Error (auth/wrong-password).";
    const emailerr="Firebase: Error (auth/user-not-found).";
   if(!email || !password){
  setErr("Fill all the Field");
   }else{
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (e) {
      if(e.message === emailerr) {
       setErr("Invalid email");
      }else if(e.message=== passerr){
        setErr("Invalid password");
      }else{
        setErr(true);

      }
      console.log(e.message);
    }
    }
  };

  return (
    <>
    <div className="Login">
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
            <Link to="/">
              <h1 className="lg-text">TalkTastic</h1>
              <p className="lg-slogan">connect with the world</p>
            </Link>
          </div>
        </div>
      </div>
      <header className="Login-header">
        <div className="login-imgbox">
          <img className="log-img" src={LA} alt="" />
        </div>
        <div className="line"></div>
        <div className="formbox">
        <form className="form" onSubmit={handleSubmit}>
          <div className="h1">
            <h1 className="h1-head">Log In</h1>
            <img src={LI} alt="user.img" />
            
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
            ></input>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
            ></input>
          </div>

          <div className=" login-btn">
            <button type="submit" className="nav-btn">
              Submit
            </button>
          </div>
          <p className="Error"><b>{err}</b></p>
          <p className="navigate-link">
            Don't have an account?
            <Link to="/SignUp">
              <span>Sign Up</span>
            </Link>
          </p>
        </form>
        </div>
      </header>
    </div>
    </>
  );
}

export default Login;
