import Login from "./Login";
import "./HomePage.css";
const HomePage = () => {
  return (
    <>
      <Login />
      <div className="">
        <h1 className="homepage-title">
          <span class="homepage-title-inner">
            Create a day plan based around popular activities, festivals, local
            buisnesses, or whatever you feel like.
          </span>
        </h1>
        <div class="grid-container">
          <div class="grid-item">
            <img style={{ height: "100px" }} src="../redux.png" />
          </div>
          <div class="grid-item">
            <img style={{ height: "100px" }} src="../node.png" />
          </div>

          <div class="grid-item">
            <img style={{ height: "100px" }} src="../npm-logo.png" />
          </div>

          <div class="grid-item">
            <img style={{ height: "100px" }} src="../react.png" />
          </div>
          <div class="grid-item last-double-columns">
            <img style={{ height: "100px" }} src="../mongodb_logo.png" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
