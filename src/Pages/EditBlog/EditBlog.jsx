import React, { useState, useEffect, useContext } from "react";

import TextField from "@mui/material/TextField";

import UserContext from "../../Context/UserContext";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { user, setUser, perBlog, setPerBlog } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  const navigate = useNavigate();

  useEffect(() => {
    if (token && userid && perBlog) {
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
  }, [perBlog, setUser, token, userid]);

  const handleAddBlog = (event) => {
    event.preventDefault();

    axios
      .put(`${BACKEND_SERVER}/edit-blog/${userid}`, perBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Blog SuccessFully Edited");
        setTimeout(() => {
          navigate("/viewblog");
        }, 3000);
      })
      .catch((err) => {
        toast.error("Error On Editing Blog");
      });
  };

  return (
    <>
      {token && userid && user && perBlog && (
        <div className="addBlogPage">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="innerBlogPage">
            <h2
              style={{
                margin: "10px 0",
              }}
            >
              Edit Blog
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
                value={perBlog.title}
                placeholder="Enter name"
                onChange={(e) => {
                  setPerBlog({
                    ...perBlog,
                    title: e.target.value,
                  });
                }}
              />

              <textarea
                placeholder="Description..."
                name="description"
                value={perBlog.description}
                rows="4"
                style={{
                  width: "95%",
                  resize: "vertical",
                  fontSize: "1rem",
                  padding: "10px",
                  margin: "5px 0",
                }}
                onChange={(e) => {
                  setPerBlog({
                    ...perBlog,
                    description: e.target.value,
                  });
                }}
              />

              <Button variant="contained" color="success" type="submit">
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlog;
