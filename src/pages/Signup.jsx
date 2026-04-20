import React, { useState } from "react";
import { auth,db } from '../firebase/config';
import { signup } from "../firebase/config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";



function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const userCredential = await signup(email, password);

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: serverTimestamp(),
    });

    alert("Signup successful 🎉");
    navigate("/blogs");

  } catch (error) {
    alert(error.message);
  }
};

  return (
  <div className="signup-container">
    <form className="signup-form" onSubmit={handleSignup}>
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Signup</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
);
}

export default Signup;