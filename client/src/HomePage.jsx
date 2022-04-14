import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage = () => {
  return (
    <>
      <div className="my-homepage">
        <h1
          className="homepage-title"
          style={{ marginTop: "90px", marginLeft: "20px" }}
        >
          <span class="homepage-title-inner">
            Create a day plan based around popular activities, festivals, local
            buisnesses, or whatever you feel like.{" "}
            <Link to={"/categories"}>Get Started</Link>
          </span>
        </h1>
        <div class="grid-container">
          <div class="grid-item">
            <img alt="redux" style={{ height: "100px" }} src="../redux.png" />
          </div>
          <div class="grid-item">
            <img alt="node" style={{ height: "100px" }} src="../node.png" />
          </div>

          <div class="grid-item">
            <img alt="npm" style={{ height: "100px" }} src="../npm.png" />
          </div>

          <div class="grid-item">
            <img
              alt="react"
              style={{ height: "100px", paddingTop: "5px" }}
              src="../react.png"
            />
          </div>
          <div class="grid-item last-double-columns">
            <img
              alt="mongodb"
              style={{ height: "100px" }}
              src="../mongodb.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
