import React, { useEffect, useState, useRef } from "react";
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

const containerStyle = {
  height: "calc(100vh - 60px)",
  position: "relative",
  bottom: "0",
};

const steps = [
  {
    target: ".my-first-step",
    content:
      "Here is where youll set the starting location for your plan, try looking for a popular spot near you i.e. the walmart down the block or a popular neighborhood or local spot",
  },
  {
    target: ".second-step",
    content:
      "You can also use geolocation if youd like to set the start of the plan to your current location, you'll see a big purple dot representing your location",
  },
  {
    target: ".destination-page-map-container",
    content:
      "Click anywhere on the map to scope out an area, we'll show you a photo if we have one, this won't set your starting location for your created plan though, for that youll have to use the searchbar or geolocation",
  },
  {
    target: ".generate-plan-link",
    content: "You can create a plan using this location",
  },
  {
    target: "#header_plan_btn",
    content:
      "Look for this button in the header to also create a plan using your selected location",
  },
];

const PlacesAutoComplete = () => {
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  const flag = "";
  useEffect(() => {
    if (flag) return;
    if (!categoryLength) {
      navigate("/categories");
    }
  }, [categoryLength, navigate]);

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

  const didMount = useRef(false);
  const hasSeenThis = useRef(false);

  useEffect(() => {
    if (didMount.current && drawerOpen && !hasSeenThis.current) {
      hasSeenThis.current = true;
      setRun(false);
      const timeout = setTimeout(() => {
        setStepIndex(3);
        setRun(true);
      }, 700);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      didMount.current = true;
    }
  }, [drawerOpen]);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (index >= 2 && !drawerOpen) {
        setRun(false);
      }
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
    }
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
        hideBackButton={stepIndex >= 3}
        styles={{
          options: {
            arrowColor: "#e3ffeb",
            backgroundColor: "#e3ffeb",
            overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#000",
            textColor: "#004a14",
            width: 900,
            zIndex: 1000,
          },
        }}
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
