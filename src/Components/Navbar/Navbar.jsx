import React, { useEffect, useContext } from "react";
import "./Navbar.css";

import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";
import UserContext from "../../Context/UserContext";

import logo from "./Assets/logo.jpg";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

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
    }
  }, [setUser, token, userid]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="" draggable="false" />
          <h2>Blog Monk</h2>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <NavLink to="/profile" className="nav-item">
                Hey, {user.fullname.split(" ")[0]}
              </NavLink>
              <NavLink to="/createblog" className="nav-item">
                Add Blog
              </NavLink>
              <NavLink to="/viewblog" className="nav-item">
                View Blog
              </NavLink>
              <span
                className="nav-item nav-logout"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <NavLink to="/register" className="nav-item">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="nav-item">
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
