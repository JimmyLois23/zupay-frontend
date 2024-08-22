import React, { useState, useEffect, useContext } from "react";
import "./Blog.css";
import UserContext from "../../Context/UserContext";
import axios from "axios";
import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";

const Blog = () => {
  const { user, setUser, setPerBlog } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

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

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (token && userid) {
      axios
        .get(`${BACKEND_SERVER}/get-blog/${userid}?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.href = "/login";
    }
  }, [page, token, userid]);

  const deleteBlog = (_id) => {
    axios
      .delete(`${BACKEND_SERVER}/delete-blog/${userid}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Deleted Blog Successfully");
        axios
          .get(`${BACKEND_SERVER}/get-blog/${userid}?page=${page}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Deleting Blog");
      });
  };

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <>
      {token && userid && user && (
        <div className="blogPage">
          <Toaster position="top-right" reverseOrder={false} />

          <div className="innerBlog">
            <h2
              style={{
                margin: "10px 0",
              }}
            >
              My Blogs
            </h2>
            {data.totalBlogs && data.totalBlogs.length !== 0 ? (
              <>
                {data.totalBlogs.map((blog) => (
                  <div className="cardBox" key={blog._id}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "80%",
                          md: "60%",
                          lg: "40%",
                          xl: "30%",
                        },
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        margin: "auto",
                      }}
                    >
                      <img
                        src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Profile Picture"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                    <div
                      className="para"
                      style={{
                        marginLeft: "20px",
                      }}
                    >
                      <h3>{blog.title}</h3>
                      <p>{blog.description}</p>
                      <p>Written By : {blog.username} </p>
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(blog)}
                      sx={{
                        m: 1,
                      }}
                    >
                      View
                    </Button>

                    <Link
                      to="/editblog"
                      onClick={() => {
                        setPerBlog(blog);
                      }}
                    >
                      <ModeEditIcon
                        sx={{
                          m: 1,
                        }}
                      />
                    </Link>

                    <DeleteIcon
                      onClick={() => {
                        deleteBlog(blog._id);
                      }}
                      sx={{
                        m: 1,
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
                <Stack
                  spacing={2}
                  sx={{
                    m: 1,
                  }}
                >
                  <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={(e, v) => {
                      setPage(v);
                    }}
                    color="secondary"
                  />
                </Stack>
              </>
            ) : (
              <>
                {data.length !== 0 && data.totalBlogs.length === 0 ? (
                  <h3
                    style={{
                      margin: "10px 0",
                    }}
                  >
                    Please Create Blogs To See Them Here ~
                  </h3>
                ) : (
                  <>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "80%",
                        m: 1,
                      }}
                      height={80}
                    />
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: "80%",
                        m: 1,
                      }}
                      height={80}
                    />
                  </>
                )}
              </>
            )}
          </div>

          {/* Modal for viewing blog */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "90%",
                  sm: "80%",
                  md: "60%",
                  lg: "50%",
                  xl: "40%",
                },
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              {selectedBlog && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedBlog.title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {selectedBlog.description}
                  </Typography>
                  <Typography
                    id="modal-modal-author"
                    sx={{ mt: 2, fontStyle: "italic" }}
                  >
                    Written By: {selectedBlog.username}
                  </Typography>
                </>
              )}
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Blog;
