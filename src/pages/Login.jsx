import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import {  Navigate,useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
function Login() {
    const { user } = useContext(AuthContext);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    if (user) {
    return <Navigate to="/blogs" />;
    }
    const handleLogin= async ()=>{
        try{
            await signInWithEmailAndPassword(auth,email,password);
            alert("Login successful")
            navigate('/blogs');
        }
        catch(error){
            alert(error.message);
        }
    };

return (
  <div className="login-container">
    <div className="login-box">
      <h2>Welcome Back 👋</h2>

      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
          <p>
  Don’t have an account? <a href="/signup">Signup</a>
</p>
    </div>

  </div>
);
}

export default Login


