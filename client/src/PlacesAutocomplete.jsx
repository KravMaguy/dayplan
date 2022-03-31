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
const containerStyle = {
  height: `100vh`,
};

const PlacesAutoComplete = () => {
  const dispatch = useDispatch();
  const center = useSelector((state) => state.center);
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  const [userCenter, setUserCenter] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const resetMapCenter = (chosenLocation) => {
    const { lat, lng } = chosenLocation[0].geometry.location;
    const newCenter = { lat: lat(), lng: lng() };
    dispatch({
      type: "SET_CENTER",
      payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
    });
    setZoom(13);
    setUserCenter(newCenter);
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

  const runGetLocation = () => {
    console.log("getLocation run");
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };
        dispatch({
          type: "SET_CENTER",
          payload: { center: { lat: newCenter.lat, lng: newCenter.lng } },
        });
        setZoom(13);
        setUserCenter(newCenter);
        geocodeByLatLng({ lat: newCenter.lat, lng: newCenter.lng })
          .then((results) => {
            setInputValue(results[0].formatted_address);
          })
          .catch((error) => console.error(error));
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log({ inputValue });
  return (
    <>
      <div style={{ position: "fixed", width: "100vw", bottom: 0 }}>
        <div class="constrained top-container">
          <button onClick={getYelp}>get yelp places</button>
          {userCenter && <Link to={"/plan"}>lets go!</Link>}
          <GooglePlacesAutocomplete
            selectProps={{
              inputValue,
              value,
              onInputChange: (newInputValue, meta) => {
                setInputValue(newInputValue);
              },
              placeholder: "Type or Search Location",
              onChange: (val) => handleSelect(val),
            }}
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          />
          <div className="icon" onClick={runGetLocation}>
            <span>
              <MdLocationOn
                size={18}
                className="location-icon"
                color={"green"}
              />
            </span>
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
                lat: userCenter.lat,
                lng: userCenter.lng,
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
    </>
  );
};

export default PlacesAutoComplete;
