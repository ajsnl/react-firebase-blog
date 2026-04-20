import { useState, useContext, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function AddEditBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  //  FETCH BLOG FOR EDIT
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title);
            setContent(data.content);
          }
        } catch (error) {
          alert(error.message);
        }
      }
    };

    fetchBlog();
  }, [id]);

  //  ADD / UPDATE
  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        alert("Please fill all fields");
        return;
      }

      if (id) {
        await updateDoc(doc(db, "blogs", id), {
          title,
          content,
        });
        alert("Blog updated");
      } else {
        await addDoc(collection(db, "blogs"), {
          title,
          content,
          userId: user.uid,
          userEmail: user.email,
          createdAt: new Date(),
        });
        alert("Blog added");
      }

      navigate("/blogs");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
  <h2>{id ? "Edit Blog" : "Add Blog"}</h2>

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    placeholder="Content"
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />

  <button className="btn btn-add" onClick={handleSubmit}>
    {id ? "Update" : "Submit"}
  </button>
</div>
  );
}

export default AddEditBlog;