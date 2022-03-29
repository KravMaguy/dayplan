import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";

import Map from "./Map";

const containerStyle = {
  width: "100%",
  height: `calc(75vh - 62px)`,
  position: "absolute",
  bottom: 0,
  boxShadow: "rgb(0 0 0 / 9%) 0px -3px 5px",
};
const PlacesAutoComplete = ({ center }) => {
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  // const center = state.center;

  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);

  const [userCenter, setUserCenter] = useState(null);

  const resetMapCenter = (chosenLocation) => {
    const { lat, lng } = chosenLocation[0].geometry.location;
    const newCenter = { lat: lat(), lng: lng() };
    // setCenter(newCenter);
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

  return (
    <>
      <div class="constrained top-container">
        {userCenter && <Link to={"/plan"}>lets go!</Link>}
        <GooglePlacesAutocomplete
          selectProps={{
            placeholder: "Type or Search Location",
            value,
            onChange: (val) => handleSelect(val),
          }}
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        />
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
    </>
  );
};

export default PlacesAutoComplete;
