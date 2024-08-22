import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [userData, setUserData] = useState({
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

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post(`${BACKEND_SERVER}/login`, userData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.userid);
        toast.success("You Have Logged Successfully");
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Email or Password");
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
            Sign In
          </h1>
          <form onSubmit={handleLogin}>
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

            <button type="submit">SignIn</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
