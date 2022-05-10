import React, { useEffect, useState, useRef } from "react";
import "./Marker.css";
import "./toast.css";

import { useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";
import Map from "./Map";
import { useNavigate } from "react-router";
import PlaceDrawer from "./PlaceDrawer";
import PlacePreview from "./PlacePreview";
import CustomSearchBar from "./CustomSearchBar";
import CustomLocationOverlay from "./CustomLocationOverlay";
import CustomRide from "./CustomRide";
import { MdLocationOn } from "react-icons/md";
import { useMediaHeight } from "./useMediaQuery";

import {
  locationSteps,
  dragPlanTourStyle as locationTourStyles,
} from "./TourUtils";
import { ACTIONS, EVENTS, STATUS } from "react-joyride";

const initialHeight = window.innerHeight;
const PlacesAutoComplete = () => {
  const headerHeight = 60;
  const [x, setX] = useState(-headerHeight);

  const currentQuery = useMediaHeight();
  const { height } = currentQuery;

  useEffect(() => {
    if (height < initialHeight) {
      const newHeight = headerHeight + (initialHeight - height);
      setX(newHeight);
    }
  }, [x, height]);
  console.log(x, "the curr x");
  console.log("so the query is: ", `calc(100vh + ${x}px)`);
  const containerStyle = {
    height: `calc(100vh + ${x}px)`,
    // position: "sticky",
    position: "relative",
    top: "0",
  };
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  const flag = "gfjkhjg";
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
  const [showingToast, setShowToast] = useState(false);
  const [exactDate, setExactDate] = useState(Date.now());
  console.log({ drawerOpen });
  useEffect(() => {
    if (!userCoordinates?.geocodedAddress) {
      return;
    }
    const placeId = userCoordinates?.geocodedAddress[0].place_id;
    let clearAble;
    if (Date.now() - exactDate < 2200) {
      const animationTimeDifference = 2200 - (Date.now() - exactDate);
      console.log({ animationTimeDifference });
      clearAble = slowOpenSetValue(null, animationTimeDifference);
    } else {
      clearAble = slowOpenSetValue(null, 0);
    }
    setPlaceId(placeId);
    console.log({ clearAble });
    return () => window.clearTimeout(clearAble);
  }, [userCoordinates?.geocodedAddress, exactDate]);

  const didMount = useRef(false);
  const hasSeenThis = useRef(false);

  useEffect(() => {
    if (didMount.current && drawerOpen && !hasSeenThis.current) {
      hasSeenThis.current = true;
      setRun(false);
      const timeout = setTimeout(() => {
        setStepIndex(3);
        setRun(true);
      }, 1000);
      console.log({ timeout });
      return () => {
        clearTimeout(timeout);
      };
    } else {
      didMount.current = true;
    }
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen && stepIndex === 4) {
      setRun(false);
    }
  }, [drawerOpen, stepIndex]);

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

  useEffect(() => {
    // const visitedPage = localStorage.getItem("hasSeenLocationsTour");
    // if (!visitedPage) {
    //   localStorage.setItem("hasSeenLocationsTour", "been here");
    //   return;
    // }
    // setRun(false);
    localStorage.removeItem("hasSeenLocationsTour");
  }, []);

  useEffect(() => {
    if (showingToast) {
      const toastTimeout = setTimeout(() => {
        setShowToast(false);
      }, 2100);
      return () => clearTimeout(toastTimeout);
    }
  }, [showingToast]);
  const [value, setValue] = useState(null);

  function slowOpenSetValue(val, timeout) {
    console.log("i open the drawer with a timeout of :", timeout);
    setTimeout(() => {
      setOpenDrawer(true);
    }, timeout);
    val && setValue(val);
  }
  return (
    <div className="user-destination-page">
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen ? "active" : ""}
      ></div>
      {/* <div
        className={`constrained ${
          !drawerOpen ? "visible-searchbar" : "hidden-searchbar"
        }`}
      > */}
      <div className={`toastify$$ ${showingToast ? "show" : ""}`} id="toast">
        <div id="img">
          <MdLocationOn className="toast-location-icon" />
        </div>
        <div className={`someclass ${showingToast ? "description" : "nopad"}`}>
          Loading Geolocation
        </div>
      </div>
      {/* </div> */}
      <CustomRide
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        hideBackButton={stepIndex >= 3}
        styles={locationTourStyles}
        steps={locationSteps}
      />
      <PlaceDrawer
        photos={photos}
        drawerOpen={drawerOpen}
        name={name}
        formatted_address={formatted_address}
        types={types}
        website={website}
        setExactDate={setExactDate}
      />
      <div
        className={`plan-preview-map-container ${
          drawerOpen
            ? "closed-preview-map-control-size"
            : "open-preview-map-control-size"
        }`}
      >
        <CustomSearchBar
          setShowToast={setShowToast}
          drawerOpen={drawerOpen}
          setFocused={setFocused}
          userCoordinates={userCoordinates}
          setZoom={setZoom}
          setPlaceId={setPlaceId}
          setExactDate={setExactDate}
          exactDate={exactDate}
          value={value}
          slowOpenSetValue={slowOpenSetValue}
        />
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

        {clickedLocation && (
          <div
            className={`constrained ${
              !drawerOpen ? "visible-searchbar" : "hidden-searchbar"
            }`}
          >
            <PlacePreview
              drawerOpen={drawerOpen}
              clickedLocation={clickedLocation}
              setZoom={setZoom}
              focused={focused}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
