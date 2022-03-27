import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Map from "./Map";

const PlacesAutoComplete = () => {
  const [zoom, setZoom] = useState(10);

  const [center, setCenter] = useState({
    lat: 40.7579746792255,
    lng: -73.98546749996966,
  });
  return (
    <>
      <div class="constrained top-container">
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        />
      </div>

      <Map
        containerClass="map-container"
        center={center}
        zoom={zoom}
        setZoom={setZoom}
      />
    </>
  );
};

export default PlacesAutoComplete;
