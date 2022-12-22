import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../Firebase";
import {db  } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./BussinessSignUp.css";
import Add from '../img/addAvatar.png'

function SignUp() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await addDoc(collection(db, "users"), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await addDoc(collection(db, "userChats"), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  }
  return (
    <div className="SignUp">
      <header className="SignUp-header">
        <div className="h1">
          <h1>Sign Up</h1>
          <h3> Already have an account? <Link to="/Login"><span>Log In</span></Link> </h3>
          <b className="Error">{err }</b>
          <b className="Error">{loading }</b>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"> FullName </label>
            <input required type="text" className="form-control" id="exampleInputEmail1"></input>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"> Email Address</label>
            <input required type="email"  className="form-control"  id="exampleInputEmail1" ></input>
          </div> 
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file" className="my-3 Avatar">
            <img src={Add} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button disabled={loading}
            type="submit"
            className="btn" >
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default SignUp;
