import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses } from "./redux/reducer.js";
import Map from "./Map";
import { MdLocationOff, MdLocationOn } from "react-icons/md";

const containerStyle = {
  height: `50vh`,
};

const PlacesAutoComplete = ({ center }) => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => state.businesses);
  // const center = state.center;

  console.log("the buisnesses ", businesses);
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

  const getYelp = () => {
    const term = "restaurants";
    const place = "chicago";
    const terms = { term, place };
    dispatch(fetchBusinesses(terms));
  };

  return (
    <>
      <div style={{ position: "fixed", width: "100vw", bottom: 0 }}>
        <div class="constrained top-container">
          <button onClick={getYelp}>get yelp places</button>
          {userCenter && <Link to={"/plan"}>lets go!</Link>}
          <GooglePlacesAutocomplete
            selectProps={{
              placeholder: "Type or Search Location",
              value,
              onChange: (val) => handleSelect(val),
            }}
            apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
          />
          <div onClick={() => {}} className="icon">
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
