import React from "react";
import fusion from "./images/fusion.png";
const HomePageLink = ({ navigate }) => {
  return (
    <div
      className="logo"
      onClick={() => {
        navigate("/");
      }}
    >
      <img
        alt="homepage link"
        src={fusion}
        style={{
          size: "1.875em",
          height: "2em",
          position: "absolute",
          top: "10px",
          left: "15px",
        }}
      />
    </div>
  );
};

export default HomePageLink;
