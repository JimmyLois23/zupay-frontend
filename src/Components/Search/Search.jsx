import React, { useState, useEffect } from "react";
import "./Search.css";

import axios from "axios";

import { BACKEND_SERVER } from "../../Helper/BaseUrl";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
 
const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const searchFunc = (val, p) => {
    axios
      .post(`${BACKEND_SERVER}/search-blog?query=${val}&page=${p}`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
    searchFunc(searchData, value);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchData(val);
    if (val === "") {
      setData([]);
    }

    if (val !== "" && val !== " ") {
      searchFunc(val, page);
    }
  };

  // const generateRandomColor = () => {
  //   const randomColor1 =
  //     "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   const randomColor2 =
  //     "#" + Math.floor(Math.random() * 16777215).toString(16);

  //   return {
  //     background: `linear-gradient(45deg, ${randomColor1}, ${randomColor2})`,
  //   };
  // };

  return (
    <>
      <div className="searchContainer">
        <div className="upBox">
          <div className="searchBox">
            <input
              type="text"
              name="searchData"
              id="searchData"
              placeholder="Search Blog"
              value={searchData}
              onChange={handleSearch}
            />
            <SearchIcon sx={{ m: 1, fontSize: "2rem", cursor: "pointer" }} />
          </div>
        </div>
        <div className="downBox">
          {data.totalBlogs && data.totalBlogs.length !== 0 ? (
            <>
              {data.totalBlogs.map((blog, index) => (
                <div className="cardBox" key={blog._id}>
                  {/* <div className="box" style={generateRandomColor()}></div> */}
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
                    <p>Written By : {blog.username}</p>
                  </div>
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
                  onChange={handleChange}
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
                  This Blog Is Not In DataBase - Search Something Else`~`
                </h3>
              ) : (
                <>
                  <h1
                    style={{
                      margin: "10px 0",
                    }}
                  >
                    Welcome to Blog Monk
                  </h1>
                  <h1>Search Something On Top</h1>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
