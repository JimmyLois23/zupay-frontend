import React, { useState } from "react";
import "./Register.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    axios
      .post(`${BACKEND_SERVER}/register`, userData)
      .then((res) => {
        console.log(res.data);
        toast.success("Completed Sign Up!");
        setUserData({
          fullname: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error On SignUp");
      });
  };

  return (
    <>
      <div className="registerPage">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="innerRegister">
          <h1
            style={{
              margin: "10px 0",
            }}
          >
            Sign Up
          </h1>
          <form onSubmit={handleRegister}>
            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="fullname"
                type="text"
                id="outlined-basic"
                label="Full Name"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.fullname}
                placeholder="Enter name"
                onChange={handleChange}
              />
            </Box>

            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="email"
                type="email"
                id="outlined-basic"
                label="Email"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.email}
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Box>

            <Box
              sx={{
                m: 1,
                width: "100%",
              }}
            >
              <TextField
                name="password"
                id="outlined-basic"
                type="password"
                label="Password"
                style={{
                  width: "100%",
                }}
                variant="outlined"
                color="secondary"
                value={userData.password}
                placeholder="Enter password"
                onChange={handleChange}
              />
            </Box>

            <button type="submit">SignUp</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
