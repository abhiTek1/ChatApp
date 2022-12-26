import { React ,useState} from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {BsThreeDots } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { collection, query, where, getDocs, updateDoc,doc} from "firebase/firestore";
import { collectio,set } from "firebase/firestore";
import Modal from 'react-bootstrap/Modal';
import { db } from "../Firebase";
const View = () =>{
    const { currentUser } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [nam,setName]=useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const updateUser = async (email,nam) => {
        console.log(email,nam)
        const userRef = query(collection(db, "users"), where("email", "==", email));
        const findUsers = await getDocs(userRef);
        console.log(findUsers)
        findUsers.forEach( async (user) => {
         const getUser = doc(db, 'users', user.id);
         console.log(getUser)
         await updateDoc(getUser, {
            displayName: nam,
          
         });
        });

        // const q = query(collection(db, "users"), where("email", "==", email));

        // const querySnapshot = await getDocs(q);
        // let docID = '';
        // querySnapshot.forEach((doc) => {
        // // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
        //   docID = doc.uid;
        // });
        // const user = doc(db, "users", docID);

        // // Set the "capital" field of the city 'DC'
        // await updateDoc(user, {
        //     name: nam
            
        // });
        console.log("updated")
       }
return(
    <div className="View p-2">
     <Modal show={show} onHide={handleClose}>
        
          
        <Modal.Body>New Names:
        <input type="text" onChange={(e)=>setName(e.target.value)} />
        <button onClick={()=>updateUser(currentUser.email,nam)}>submits</button>
        </Modal.Body>
        
      </Modal>
        <div className="container">
        <BsThreeDots   onClick={handleShow}/>
            <img src={currentUser.photoURL} alt=''/>
            <span>{currentUser.displayName}</span>

            <p className=""> {currentUser.email}</p>
            {/* <p>{currentUser.uid}</p> */}
           

        </div>
    </div>
)
}
export default View;