import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="navbar">
  <h3>My Blog App</h3>

  <div>
    <span>{user?.email}</span>

    <button onClick={() => navigate("/blogs")}>Blogs</button>
    <button onClick={() => navigate("/add")}>Add</button>
    <button onClick={handleLogout}>Logout</button>
  </div>
</div>
  );
}

export default Navbar;