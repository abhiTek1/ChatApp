import React, { useContext, useState } from "react";
import { GoArrowRight} from "react-icons/go";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [res,setres]=useState(true)
  

  const { currentUser } = useContext(AuthContext);
  

  const handleSearch = async () => {
    var res=0;
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    )
    setErr("")
  //  if(q)
  //  {
  //   console.log(q)
  //   const querySnapshot = await getDocs(q);
  //   console.log(querySnapshot)
  //   querySnapshot.forEach((doc) => {
  //     setUser(doc.data());
  //   }); 
  //   console.log(user)

  //  }
  //  else{
  //   console.log("rerer")
  //  }
    try {
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        res=Object.keys(user).length
        console.log(res)
        
      }); 
     
     
      
    }
     catch (error) {
      setErr("dfdfd")
     
      
    }
    if(res===0)
    {
      console.log("fdfd")
      setErr("User not Exist")
    }
    
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    
    const combinedId =
    (currentUser.displayName+currentUser.uid) >(user.displayName+user.uid)
        ? (currentUser.displayName+currentUser.uid)+ (user.displayName+user.uid)
        : (user.displayName+user.uid)+ (currentUser.displayName+currentUser.uid);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("")
  };
  return (
    <div className="search sticky-top">
      <div className="searchForm d-flex">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <GoArrowRight onClick={handleSearch} className="go"/>
        {/* <img className="-pl-5" src="https://icons.getbootstrap.com/assets/icons/arrow-right-square-fill.svg"alt ="dfd" onClick={handleSearch} /> */}

       
      </div>
       <span className="p-5 usererror">{err}</span>
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="userimg" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
