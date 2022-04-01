import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import "./Header.css";

import axios from "axios";
const Login = () => {
  const responseGoogle = async (response) => {
    if (response.profileObj) {
      const { profileObj } = response;
      try {
        const data = await axios.post("/createlogin/", profileObj);
        console.log("the data", data);
      } catch (error) {
        console.error("err: ", error);
      }
    }
  };

  console.log("process: ", process.env);
  return (
    <>
      <div class="header header-fixed shadow">
        <div class="navbar container">
          <div class="logo">
            {/* <a href='#home'> */}
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
            {/* </a> */}
          </div>
          {/* <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            clientSecret={process.env.REACT_APP_CLIENT_SECRET}
          /> */}

          <button className="no-link pure-material-button-text">
            Lets Go!
          </button>
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
