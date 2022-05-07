import React, { useEffect, useState } from "react";
import "./Marker.css";
import { useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";
import Map from "./Map";
import { useNavigate } from "react-router";
import PlaceDrawer from "./PlaceDrawer";
import PlacePreview from "./PlacePreview";
import CustomSearchBar from "./CustomSearchBar";
import CustomLocationOverlay from "./CustomLocationOverlay";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
const steps = [
  {
    target: ".my-first-step",
    content:
      "Here is where youll set the starting location for your plan, try looking for a popular spot near you i.e. the walmart down the block or a popular neighborhood or local spot",
  },
  {
    target: ".second-step",
    content:
      "You can also use geolocation if youd like to set the start of the plan to your current location",
  },
  {
    target: ".generate-plan-link",
    content: "you can create a plan using this location",
  },
];

const containerStyle = {
  height: "calc(100vh - 60px)",
  position: "relative",
  bottom: "0",
};

const PlacesAutoComplete = () => {
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!categoryLength) {
  //     navigate("/categories");
  //   }
  // }, [categoryLength, navigate]);

  const center = useSelector((state) => state.center);
  const userCoordinates = useSelector((state) => state.position);

  const userCenter = useSelector((state) => state.userCenter);
  const [zoom, setZoom] = useState(10);
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [place, setPlace] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [focused, setFocused] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [run, setRun] = useState(true);

  const { photos, name, formatted_address, types, website } = place || {};

  useEffect(() => {
    if (!userCoordinates?.geocodedAddress) {
      return;
    }
    const placeId = userCoordinates?.geocodedAddress[0].place_id;
    setOpenDrawer(true);
    setPlaceId(placeId);
  }, [userCoordinates?.geocodedAddress]);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      console.log("in here");
      console.log("index: ", index);
      if (index <= 1 && drawerOpen) {
        console.log("reached");
        // setRun(false);
      }
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      console.log({ action });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setRun(false);
    }
    console.log({ data }); //eslint-disable-line no-console
  };

  return (
    <div className="user-destination-page">
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen && "active"}
      ></div>
      <Joyride
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        steps={steps}
        continuous={true}
        run={run}
      />

      <PlaceDrawer
        photos={photos}
        drawerOpen={drawerOpen}
        name={name}
        formatted_address={formatted_address}
        types={types}
        website={website}
      />
      <div
        className={`plan-preview-map-container ${
          drawerOpen
            ? "closed-preview-map-control-size"
            : "open-preview-map-control-size"
        }`}
      >
        <CustomSearchBar
          drawerOpen={drawerOpen}
          setFocused={setFocused}
          userCoordinates={userCoordinates}
          setZoom={setZoom}
          setPlaceId={setPlaceId}
          setOpenDrawer={setOpenDrawer}
        />
        <div
          className="destination-page-map-container"
          style={{ width: "100%" }}
        >
          <Map
            containerClass="map-container"
            center={center}
            zoom={zoom}
            setZoom={setZoom}
            containerStyle={containerStyle}
            placeId={placeId}
            setPlace={setPlace}
            place={place}
            clickedLocation={clickedLocation}
            setClickedLocation={setClickedLocation}
          >
            {clickedLocation && (
              <CustomLocationOverlay
                title={"point of interest"}
                position={clickedLocation}
                classes={"clicked"}
                keyId={clickedLocation.lat}
              />
            )}
            {userCoordinates && (
              <CustomLocationOverlay
                title={"your location"}
                position={{
                  lat: userCoordinates.center.lat,
                  lng: userCoordinates.center.lng,
                }}
              />
            )}
            {userCenter &&
              userCenter.center.lat !== userCoordinates?.center.lat &&
              userCenter.center.lng !== userCoordinates?.center.lng && (
                <Marker
                  position={{
                    lat: userCenter.center.lat,
                    lng: userCenter.center.lng,
                  }}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />
              )}
          </Map>
          {clickedLocation && !focused && (
            <PlacePreview
              drawerOpen={drawerOpen}
              clickedLocation={clickedLocation}
              setZoom={setZoom}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
