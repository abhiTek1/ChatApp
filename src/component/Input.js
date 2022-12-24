import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Ab from "../img/AbhiPic.jpeg";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [img1, setImg1] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const photo=[Img,Ab]
function funset()
{
  console.log("img set")
  // setText(Ab)
  setImg1(Ab)
  
  // handleSend()
}

  const handleSend = async () => {
    if (img ) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef,img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
               
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } 
    // else if (img1 ) {
    //   // console.log("img",img1)
    //   const storageRef1 = ref(storage, uuid());

    //   const uploadTask1 = uploadBytesResumable(storageRef1,img1);

    //   uploadTask1.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask1.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
               
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img1: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // } 

   
    else {
      
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" onClick={()=>funset()} />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;