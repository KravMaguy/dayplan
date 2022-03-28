import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import "./Marker.css";

import Map from "./Map";

const PlacesAutoComplete = () => {
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  const [center, setCenter] = useState({
    lat: 40.7579746792255,
    lng: -73.98546749996966,
  });
  const [userCenter, setUserCenter] = useState(null);

  const resetMapCenter = (chosenLocation) => {
    const { lat, lng } = chosenLocation[0].geometry.location;
    const newCenter = { lat: lat(), lng: lng() };
    setCenter(newCenter);
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
