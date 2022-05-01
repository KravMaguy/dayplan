/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";
import Map from "./Map";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import { getUserPosition } from "./redux/thunks.js";
import { FaDirections } from "react-icons/fa";
import { useNavigate } from "react-router";

const PlacesAutoComplete = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const containerStyle = {
    height: `${height - 60}px`,
  };
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  useEffect(() => {
    if (!categoryLength) {
      navigate("/categories");
    }
  }, [categoryLength]);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dispatch = useDispatch();
  const center = useSelector((state) => state.center);
  const userCoordinates = useSelector((state) => state.position);
  const userCoordinatesGeoFormattedAddress = useSelector(
    (state) => state.position?.geocodedAddress
  );
  const userCenter = useSelector((state) => state.userCenter);
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    if (
      userCoordinatesGeoFormattedAddress &&
      userCoordinatesGeoFormattedAddress.length > 0
    ) {
      const formatted_address =
        userCoordinatesGeoFormattedAddress[0].formatted_address;
      setInputValue(formatted_address);
    }
  }, [userCoordinatesGeoFormattedAddress]);

  const resetMapCenter = (chosenLocation) => {
    setZoom(13);
    const { lat, lng } = chosenLocation[0].geometry.location;
    const newCenter = { lat: lat(), lng: lng() };
    dispatch({
      type: "SET_CENTER",
      payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
    });
    dispatch({
      type: "SET_USER_CENTER",
      payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
    });
  };

  const handleSelect = (val) => {
    console.log("in here yea?");
    setValue(val);
    const { label } = val;
    geocodeByAddress(label)
      .then((results) => {
        resetMapCenter(results);
      })
      .catch((error) => console.error(error));
  };

  const runGetUserLocation = () => {
    setValue(null);
    setZoom(13);
    if (!userCoordinates) {
      return dispatch(getUserPosition());
    }
    const newCenter = {
      lat: userCoordinates.center.lat,
      lng: userCoordinates.center.lng,
    };
    dispatch({
      type: "SET_CENTER",
      payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
    });
    dispatch({
      type: "SET_USER_CENTER",
      payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
    });
    const formatted_address =
      userCoordinatesGeoFormattedAddress[0].formatted_address;
    setInputValue(formatted_address);
  };

  const getLocationStringForAccuracy = () => {
    return encodeURI(value.label);
  };
  return (
    <div className="user-destination-page">
      <div
        className="destination-page-map-container"
        style={{ position: "absolute", width: "100vw", bottom: 0, zIndex: 0 }}
      >
        {true && (
          <div className="constrained top-container-searchbox">
            <div className="search-wrap">
              <GooglePlacesAutocomplete
                selectProps={{
                  // onFocus: () => console.log("focused"),
                  // onBlur: () => console.log("blur"),
                  inputValue,
                  value,
                  onInputChange: (newInputValue, meta) => {
                    console.log("on input change");
                    setInputValue(newInputValue);
                  },
                  placeholder: "choose location",
                  onChange: (val) => handleSelect(val),
                }}
                apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
              />
            </div>

            <div
              onClick={() => runGetUserLocation()}
              className={`${userCoordinates ? "icon icon-bg-green" : "icon"}`}
            >
              {!userCoordinates ? (
                <MdLocationOff className="location-icon" fill={"#d3d3d3"} />
              ) : (
                <MdLocationOn fill={"green"} className="location-icon" />
              )}
            </div>
          </div>
        )}

        <Map
          containerClass="map-container"
          center={center}
          zoom={zoom}
          setZoom={setZoom}
          containerStyle={containerStyle}
        >
          {userCoordinates && (
            <OverlayView
              position={{
                lat: userCoordinates.center.lat,
                lng: userCoordinates.center.lng,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="dot-shadow">
                <div className="dot">
                  <div className="dot-child"></div>
                </div>
              </div>
            </OverlayView>
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
        {userCenter && value && (
          <div className="place-preview-wrapper">
            <div className="place-preview-img-container">
              <img
                style={{
                  boxShadow: "rgb(0 0 0 / 20%) 0px 1px 2px",
                  height: "65px",
                  width: "95px",
                }}
                src={`https://maps.googleapis.com/maps/api/streetview?size=95x65&location=${getLocationStringForAccuracy()}&key=${
                  process.env.REACT_APP_GOOGLE_MAP_API_KEY
                }`}
              />
            </div>

            <div>
              <h3>{value.label.split(",")[0]}</h3>
              <p>
                {value.label.split(",")?.[1]}
                <br />
                {`${userCenter.center.lat},${userCenter.center.lng}`}
              </p>
            </div>
            <div>
              <FaDirections
                filter={"drop-shadow(2px 3px 1px rgb(0 0 0 / 0.25))"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
