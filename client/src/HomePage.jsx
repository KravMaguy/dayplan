import { Link } from "react-router-dom";
import "./HomePage.css";
import { useFetchUser } from "./hooks";
import axios from "axios";
import { useEffect, useState } from "react";
// import redux from "./images/redux.png";
// import node from "./images/node.png";
// import react from "./images/react.png";
// import npm from "./images/npm.png";
// import mongodb from "./images/mongodb.png";
import seatGeek from "./images/seatGeek.png";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const HomePage = () => {
  const user = useFetchUser();
  const [events, setEvents] = useState([]);
  const [currEvent, setCurrEvent] = useState(0);
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(
        "https://api.seatgeek.com/2/events?client_id=MjcwOTgzMTZ8MTY1MzE5ODg2OS4yMDkyMTgz&client_secret=ac4f42209f72f5166b34ba056a8f363707b56972909c87d1f9194f0d421d1389&lat=40.7580&lon=-73.9855"
      );
      const { events } = data;
      console.log({ events });
      setEvents(events);
    };
    getUserData();
  }, []);

  const images = events.map((event) => ({
    original: event.performers[0]?.image,
    thumbnail: event.performers[0]?.image,
    originalTitle: event.title,
    description: event?.short_title,
  }));

  const properties = {
    thumbnailPosition: "left",
    useBrowserFullscreen: false,
    showPlayButton: false,
    items: images,
  };

  return (
    <>
      <div className="my-homepage">
        <div style={{ width: "90%", margin: "auto" }}>
          <h1 className="homepage-title">
            <span className="homepage-title-inner">
              {user
                ? `Welcome to the day plan generator ${user?.username}, lets get started creating your custom plan based off your interests and location of your choosing.`
                : "Create a day plan based around popular activities, festivals, local buisnesses, or whatever you feel."}

              <Link to={"/categories"}>Get Started</Link>
            </span>
          </h1>
          {/* <div
            style={{
              marginTop: "60px",
              marginBottom: "60px",
              background: "silver",
              padding: "15px",
              boxShadow:
                " rgb(0 0 0 / 10%) 0px 6px 24px 0px, rgb(0 0 0 / 8%) 0px 0px 0px 1px;",
            }}
          >
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <img
                alt="seatGeekLogo"
                style={{
                  height: "60px",
                  marginTop: "10px",
                  marginRight: "10px",
                }}
                src={seatGeek}
              />
              {events.length > 0 && (
                <div
                  style={{
                    marginLeft: "10px",
                    background: "grey",
                    padding: "10px",
                    borderRadius: "1px",
                    boxShadow: "rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px",
                  }}
                >
                  <h3>{events[currEvent].title}</h3>
                  <p>{events[currEvent].venue.address}</p>
                  <p>{events[currEvent].venue.extended_address}</p>
                </div>
              )}
            </div>

            <ImageGallery {...properties} onSlide={(e) => setCurrEvent(e)} />
          </div> */}

          <div className="legal-links" style={{}}>
            <Link to={"/terms-of-service"}>Terms of Service</Link>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>

            <Link to={"/attributes"}>Attributes</Link>
          </div>
        </div>

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
