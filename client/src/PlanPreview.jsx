import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import "./planpreview.css";

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
    };
    getUserData();
  }, [params]);
  const setNewCenter = (latitude, longitude) =>
    setCenter({ latitude, longitude });
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
            <img decoding="async" src="" className="drawer-image" />
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
                      setOpenDrawer(true);
                      setNewCenter(
                        location.coordinates.latitude,
                        location.coordinates.longitude
                      );
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
