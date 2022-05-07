/* eslint-disable jsx-a11y/alt-text */
import { GoogleMarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import "./planpreview.css";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import { options } from "./planUtils";
import { SkeletonMap } from "./skeletons";
import PlanPreviewControls from "./PlanPreviewControls";
import PlaceDrawer2 from "./PlaceDrawer2";
const containerStyle = {
  height: "100%",
  position: "relative",
  bottom: "0",
};

const PlanPreview = () => {
  const params = useParams();
  const [sharedPlan, setSharedPlan] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState(null);
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [startLink, setStartLink] = useState(0);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get("/get_shared_plan", { params });
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
          setStartLink(encodeURI(results[0].formatted_address));
        })
        .catch((error) => console.error(error));
    };
    getUserData();
  }, [params]);

  useEffect(() => {
    if (selectedIdx === 0) return;
    const fetchBuisnessReviews = async () => {
      const id = sharedPlan[selectedIdx].id;
      const { data } = await axios.post("/get_buisness_reviews", { id });
      setReviews(data);
    };
    fetchBuisnessReviews();
  }, [selectedIdx, sharedPlan]);

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

      {center && sharedPlan.length > 0 ? (
        <>
          {selectedIdx !== null && (
            <PlaceDrawer2
              drawerOpen={drawerOpen}
              selectedIdx={selectedIdx}
              startLink={startLink}
              sharedPlan={sharedPlan}
              reviews={reviews}
            />
          )}

          <div
            className={`plan-preview-map-container plans-page ${
              drawerOpen
                ? "closed-preview-map-control-size"
                : "open-preview-map-control-size"
            }`}
          >
            <PlanPreviewControls
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              sharedPlan={sharedPlan}
              setNewCenter={setNewCenter}
              setOpenDrawer={setOpenDrawer}
              setZoom={setZoom}
              drawerOpen={drawerOpen}
            />
            <Map
              zoom={zoom}
              setZoom={setZoom}
              center={{ lat: center.latitude, lng: center.longitude }}
              containerStyle={containerStyle}
            >
              <GoogleMarkerClusterer options={options}>
                {(clusterer) =>
                  sharedPlan.map((location, idx) => {
                    const letter = String.fromCharCode("A".charCodeAt(0) + idx);
                    return (
                      <Marker
                        label={{ text: letter, color: "white" }}
                        onClick={() => {
                          setSelectedIdx(idx);

                          setNewCenter(
                            location.coordinates.latitude,
                            location.coordinates.longitude
                          );
                          setTimeout(() => {
                            setOpenDrawer(true);
                          }, 400);
                        }}
                        key={idx}
                        position={{
                          lat: location.coordinates.latitude,
                          lng: location.coordinates.longitude,
                        }}
                        clusterer={clusterer}
                      />
                    );
                  })
                }
              </GoogleMarkerClusterer>
            </Map>
          </div>
        </>
      ) : (
        <SkeletonMap theme="light" />
      )}
    </>
  );
};

export default PlanPreview;
