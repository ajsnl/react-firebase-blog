import { useEffect, useState, useContext } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 FETCH ALL BLOGS
  const fetchBlogs = async () => {
    try {
      const snapshot = await getDocs(collection(db, "blogs"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🔥 DELETE BLOG
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      fetchBlogs(); // refresh after delete
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="blogs-container">
    <div className="blogs-header">
      <h2>📝 Blogs</h2>
      <button className="btn add-btn" onClick={() => navigate("/add")}>
        + Add Blog
      </button>
    </div>

    <div className="blogs-grid">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <h3>{blog.title}</h3>
          <p className="blog-content">{blog.content}</p>

          <div className="blog-footer">
            <span className="author">{blog.userEmail}</span>

            {blog.userId === user?.uid && (
              <div className="actions">
                <button
                  className="btn edit-btn"
                  onClick={() => navigate(`/edit/${blog.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn delete-btn"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Blogs;