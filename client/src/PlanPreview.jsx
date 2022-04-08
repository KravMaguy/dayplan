/* eslint-disable jsx-a11y/alt-text */
import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import "./planpreview.css";
import { geocodeByLatLng } from "react-google-places-autocomplete";

const containerStyle = {
  height: `100vh`,
};
const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

const PlanPreview = () => {
  const params = useParams();
  const [sharedPlan, setSharedPlan] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState(null);
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [startLink, setStartLink] = useState(0);
  console.log(sharedPlan);
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.post("/get_shared_plan", { params });
      const { derivedData } = data;
      setSharedPlan(derivedData);
      const center = {
        latitude: derivedData[0].coordinates.latitude,
        longitude: derivedData[0].coordinates.longitude,
      };
      setCenter(center);
      geocodeByLatLng({
        lat: derivedData[0].coordinates.latitude,
        lng: derivedData[0].coordinates.longitude,
      })
        .then((results) => {
          console.log(encodeURI(results[0].formatted_address), "here the reus");
          setStartLink(encodeURI(results[0].formatted_address));
        })
        .catch((error) => console.error(error));
    };
    getUserData();
  }, [params]);

  const setNewCenter = (latitude, longitude) => {
    setCenter({ latitude, longitude });
  };

  return (
    <>
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen && "active"}
      ></div>
      {center && sharedPlan.length > 0 && (
        <>
          <div id="drawer-nav" className={drawerOpen && "active"}>
            <img
              loading="lazy"
              src={
                selectedIdx === 0
                  ? `https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${startLink}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
                  : selectedIdx > 0
                  ? sharedPlan[selectedIdx].image_url
                  : ""
              }
              className="drawer-image"
            />
          </div>
          <Map
            zoom={zoom}
            setZoom={setZoom}
            center={{ lat: center.latitude, lng: center.longitude }}
            containerStyle={containerStyle}
          >
            <MarkerClusterer options={options}>
              {(clusterer) =>
                sharedPlan.map((location, idx) => (
                  <Marker
                    onClick={() => {
                      setNewCenter(
                        location.coordinates.latitude,
                        location.coordinates.longitude
                      );
                      setSelectedIdx(idx);
                      setOpenDrawer(true);
                    }}
                    key={idx}
                    position={{
                      lat: location.coordinates.latitude,
                      lng: location.coordinates.longitude,
                    }}
                    clusterer={clusterer}
                  />
                ))
              }
            </MarkerClusterer>
          </Map>
        </>
      )}
    </>
  );
};

export default PlanPreview;
