import React from "react";
const HomePageLink = ({ navigate }) => {
  return (
    <div
      className="logo"
      onClick={() => {
        console.log("cicked");
        navigate("/");
      }}
    >
      <img
        alt="homepage link"
        src="../../fusion.png"
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
