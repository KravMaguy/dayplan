import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomePageLink from "./HomePageLink";
import "./Header.css";

import { saveThisPlan } from "./redux/reducer";
const Login = ({ setShowSearchBar, showSearchBar }) => {
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
  const isSavingPlan = useSelector((state) => state.isSavingPlan);
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
          {isAuthenticated && user ? (
            <div style={{ display: "flex" }}>
              <>
                <img
                  style={{ height: "60px" }}
                  src={user.photo}
                  alt="user avatar"
                />
                <h1>{user.username}</h1>
              </>
            </div>
          ) : (
            <HomePageLink navigate={navigate} />
          )}
          {pathname === "/plan" &&
            (isAuthenticated ? (
              <button
                onClick={() => dispatch(saveThisPlan())}
                style={{ borderRadius: "2px" }}
                className={`button ${isSavingPlan && "loading"}`}
              >
                SAVE it
              </button>
            ) : (
              <a className="button" href="/auth/google">
                login with google
              </a>
            ))}
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
              Starting Location
            </button>
          )}

          <input
            type="checkbox"
            id="navbar-toggle"
            onClick={() => {
              if (pathname === "/location") {
                setShowSearchBar(!showSearchBar);
              }
            }}
          />
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
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/location">Location</Link>
              </li>
              <li>
                <Link to="/plan">Plan</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
