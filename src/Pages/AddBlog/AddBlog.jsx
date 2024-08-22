import React, { useState, useEffect, useContext } from "react";
import "./AddBlog.css";

import TextField from "@mui/material/TextField";

import UserContext from "../../Context/UserContext";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { user, setUser } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  const navigate = useNavigate();

  useEffect(() => {
    if (token && userid) {
      axios
        .get(`${BACKEND_SERVER}/profile/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.href = "/login";
    }
  }, [setUser, token, userid]);

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "Something...",
  });

  const handleAddBlog = (event) => {
    event.preventDefault();

    axios
      .post(`${BACKEND_SERVER}/create-blog/${userid}`, blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Created Blog!");
        setTimeout(() => {
          navigate("/viewblog");
        }, 3000);
        setBlog({
          title: "",
          description: "",
          content: "Something..",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Creating Blog");
      });
  };

  return (
    <>
      {token && userid && user && (
        <div className="addBlogPage">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="innerBlogPage">
            <h2
              style={{
                margin: "10px 0",
              }}
            >
              Create Blog
            </h2>
            <form onSubmit={handleAddBlog}>
              <TextField
                name="title"
                type="text"
                id="outlined-basic"
                label="Title"
                style={{
                  width: "100%",
                  margin: "5px 0",
                }}
                variant="outlined"
                color="secondary"
                value={blog.title}
                placeholder="Enter name"
                onChange={(e) => {
                  setBlog({
                    ...blog,
                    title: e.target.value,
                  });
                }}
              />

              <textarea
                placeholder="Description..."
                name="description"
                value={blog.description}
                rows="4"
                style={{
                  width: "95%",
                  resize: "vertical",
                  fontSize: "1rem",
                  padding: "10px",
                  margin: "5px 0",
                }}
                onChange={(e) => {
                  setBlog({
                    ...blog,
                    description: e.target.value,
                  });
                }}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  mt: 1,
                }}
              >
                Add
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBlog;
