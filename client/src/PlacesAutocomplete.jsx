import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByLatLng,
} from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "./redux/reducer.js";
import Map from "./Map";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import Login from "./Login";
import { getUserPosition } from "./redux/reducer.js";

//calc does not work thought 60px(height of header) i.e. height calc(100vh-60px) does not work, replace later with getMediaQuery hook
const containerStyle = {
  height: `${window.innerHeight - 60}px`,
};
const PlacesAutoComplete = () => {
  const dispatch = useDispatch();
  const center = useSelector((state) => state.center);
  const state = useSelector((state) => state);
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  // const [userCenter, setUserCenter] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [userCoordinates, setUserCoordinates] = useState(null);

  useEffect(() => {
    if (!userCoordinates) return;
    geocodeByLatLng({
      lat: userCoordinates.center.lat,
      lng: userCoordinates.center.lng,
    })
      .then((results) => {
        console.log("we have results");
        setInputValue(results[0].formatted_address);
      })
      .catch((error) => console.error(error));
  }, [userCoordinates]);

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
    // setUserCenter(newCenter);
  };

  const handleSelect = (val) => {
    setValue(val);
    const { label } = val;
    geocodeByAddress(label)
      .then((results) => resetMapCenter(results))
      .catch((error) => console.error(error));
  };

  const getYelp = () => {
    const term = "restaurants";
    const place = "chicago";
    const terms = { term, place };
    dispatch(fetchBusinesses(terms));
  };

  // const runGetLocation = () => {
  //   console.log("getLocation run");
  //   try {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserCoordinates({ latitude, longitude });
  //       const newCenter = { lat: latitude, lng: longitude };
  //       dispatch({
  //         type: "SET_CENTER",
  //         payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
  //       });
  //       setZoom(13);
  //       setUserCenter(newCenter);
  //       geocodeByLatLng({ lat: newCenter.lat, lng: newCenter.lng })
  //         .then((results) => {
  //           setInputValue(results[0].formatted_address);
  //         })
  //         .catch((error) => console.error(error));
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div className="user-destination-page">
      <Login />
      <div
        className="destination-page-map-container"
        style={{ position: "fixed", width: "100vw", bottom: 0 }}
      >
        <div class="constrained top-container">
          {/* {userCenter && <Link to={"/plan"}>lets go!</Link>} */}
          <GooglePlacesAutocomplete
            selectProps={{
              inputValue,
              value,
              onInputChange: (newInputValue, meta) => {
                setInputValue(newInputValue);
              },
              placeholder: "Search for things to do by location",
              onChange: (val) => handleSelect(val),
            }}
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          />
          <div className="icon">
            {!userCoordinates ? (
              <MdLocationOff
                // onClick={runGetLocation}
                onClick={() => {
                  setZoom(13);
                  dispatch(getUserPosition());
                }}
                size={18}
                className="location-icon"
                fill={"grey"}
              />
            ) : (
              <MdLocationOn
                fill={"green"}
                size={18}
                className="location-icon"
              />
            )}
          </div>
        </div>

        <Map
          containerClass="map-container"
          center={center}
          zoom={zoom}
          setZoom={setZoom}
          containerStyle={containerStyle}
        >
          {userCenter && (
            <OverlayView
              position={{
                lat: userCenter.center.lat,
                lng: userCenter.center.lng,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div class="dot-shadow">
                <div class="dot">
                  <div class="dot-child"></div>
                </div>
              </div>
            </OverlayView>
          )}
        </Map>
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
