import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomePageLink from "./HomePageLink";
import "./Header.css";

import axios from "axios";
import { saveThisPlan } from "./redux/reducer";
const Login = () => {
  const navigate = useNavigate();
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  const categories = useSelector((state) => state.categories);
  const location = useLocation();
  const { pathname } = location;
  const [user, setUser] = useState(null);
  // const [data, setData] = useState(null);
  // const [isFetching, setIsFetching] = useState(false);
  const [cookies] = useCookies();

  const isAuthenticated = cookies.isAuthenticated === "true";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
          console.log({ user });
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="header header-fixed shadow">
        <div className="navbar container">
          {user && isAuthenticated ? (
            <div>
              <img
                style={{ height: "60px" }}
                src={user.photo}
                alt="user avatar"
              />
              <h1>{user.username}</h1>
            </div>
          ) : (
            <HomePageLink navigate={navigate} />
          )}
          {pathname === "/plan" && (
            <button
              onClick={() => dispatch(saveThisPlan())}
              style={{ borderRadius: "2px" }}
              className="map-controls"
            >
              SAVE THIS PLAN
            </button>
          )}
          {(userCenter || userCoordinates) && pathname === "/location" && (
            <button
              onClick={() => navigate("/plan")}
              style={{ borderRadius: "2px" }}
              className="map-controls"
            >
              PLAN
            </button>
          )}
          {pathname === "/categories" && categories.length > 0 && (
            <button
              onClick={() => navigate("/location")}
              style={{ borderRadius: "2px" }}
              className="map-controls"
            >
              Set Location
            </button>
          )}

          <input type="checkbox" id="navbar-toggle" />
          <label htmlFor="navbar-toggle">
            <i></i>
          </label>
          <nav className="menu">
            <ul>
              <li>
                {isAuthenticated ? (
                  <a href="/auth/logout">Logout</a>
                ) : (
                  <a href="/auth/google">login with google</a>
                )}
              </li>
              <li>
                <a href="/categories">Categories</a>
              </li>
              <li>
                <a href="/location">Location</a>
              </li>
              <li>
                <a href="/plan">Plan</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
