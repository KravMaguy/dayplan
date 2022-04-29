import { Link } from "react-router-dom";
import "./HomePage.css";
// import redux from "./images/redux.png";
// import node from "./images/node.png";
// import react from "./images/react.png";
// import npm from "./images/npm.png";
// import mongodb from "./images/mongodb.png";

const HomePage = () => {
  return (
    <>
      <div className="my-homepage">
        <h1
          className="homepage-title"
          style={{ marginTop: "90px", marginLeft: "20px" }}
        >
          <span className="homepage-title-inner">
            Create a day plan based around popular activities, festivals, local
            buisnesses, or whatever you feel like.{" "}
            <Link to={"/categories"}>Get Started</Link>
          </span>
        </h1>
        {/* <div className="grid-container">
          <div className="grid-item">
            <img alt="redux" style={{ height: "100px" }} src={redux} />
          </div>
          <div className="grid-item">
            <img alt="node" style={{ height: "100px" }} src={node} />
          </div>

          <div className="grid-item">
            <img alt="npm" style={{ height: "100px" }} src={npm} />
          </div>

          <div className="grid-item">
            <img
              alt="react"
              style={{ height: "100px", paddingTop: "5px" }}
              src={react}
            />
          </div>
          <div className="grid-item last-double-columns">
            <img alt="mongodb" style={{ height: "100px" }} src={mongodb} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
