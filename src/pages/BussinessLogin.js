import React,{useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import './BussinessLogin.css';

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
      } catch (err) {
        setErr(true);
        console.log(err);
      }
    };
     
  return (
    <div className="Login">
      <header className="Login-header">
      <div className="h1"><h1>Sign In</h1>
      <h3>Don't have an account?<Link to="/SignUp"><span>Sign Up</span></Link></h3>
      <b className="Error">{err}</b>
      </div>
      <form className="form" onSubmit={handleSubmit}>

<div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"></input>    
</div>
 
<div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"></input>  
</div>
  
 
<button type="submit" className="btn">Submit</button>
</form>
      </header>
    </div>
  );
}

export default Login;
