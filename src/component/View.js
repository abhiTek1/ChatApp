import { React } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const View = () =>{
    const { currentUser } = useContext(AuthContext);
return(
    <div className="View">
        <div className="container">
            <img src={currentUser.photoURL} alt=''/>
            <span> Name : {currentUser.displayName}</span>
            <p> Email : email@gmail.com</p>
        </div>
    </div>
)
}
export default View;