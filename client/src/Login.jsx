import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./Header.css";

import axios from "axios";
const Login = () => {
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname, "path location");
  return (
    <>
      <div class="header header-fixed shadow">
        <div class="navbar container">
          <div class="logo">
            <img
              src="../fusion.png"
              style={{
                size: "1.875em",
                height: "2em",
                position: "absolute",
                top: "10px",
                left: "15px",
              }}
            />
          </div>
          {(userCenter || userCoordinates) && (
            <Link to={pathname !== "/plan" ? "/plan" : "/"}>
              <button className="no-link pure-material-button-text">
                {pathname !== "/plan" ? "Lets Go" : "Change Location"}
              </button>
            </Link>
          )}

          <input type="checkbox" id="navbar-toggle" />
          <label for="navbar-toggle">
            <i></i>
          </label>
          <nav class="menu">
            <ul>
              <li>
                <a href="#search">Search</a>
              </li>
              <li>
                <a href="#calendar">Calendar</a>
              </li>
              <li>
                <a href="#map">Map</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
