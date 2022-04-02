import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HomePageLink from "./HomePageLink";
import "./Header.css";

import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  const categories = useSelector((state) => state.categories);
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div class="header header-fixed shadow">
        <div class="navbar container">
          <HomePageLink navigate={navigate} />
          {(userCenter || userCoordinates) && pathname === "/location" && (
            <button
              onClick={() => navigate("/plan")}
              style={{ borderRadius: "2px" }}
              class="map-controls"
            >
              PLAN
            </button>
          )}
          {pathname === "/categories" && categories.length > 0 && (
            <button
              onClick={() => navigate("/location")}
              style={{ borderRadius: "2px" }}
              class="map-controls"
            >
              Set Location
            </button>
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
