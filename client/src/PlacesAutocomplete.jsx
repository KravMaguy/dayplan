import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";
import Map from "./Map";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import Login from "./Login";
import { getUserPosition } from "./redux/reducer.js";
const PlacesAutoComplete = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const containerStyle = {
    height: `${height - 60}px`,
  };
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
  console.log(userCoordinatesGeoFormattedAddress, "user cooasdf");
  const userCenter = useSelector((state) => state.userCenter);
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

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
    setValue(val);
    const { label } = val;
    geocodeByAddress(label)
      .then((results) => resetMapCenter(results))
      .catch((error) => console.error(error));
  };

  const runGetUserLocation = () => {
    setZoom(13);
    dispatch(getUserPosition());
  };

  return (
    <div className="user-destination-page">
      <Login />
      <div
        className="destination-page-map-container"
        style={{ position: "absolute", width: "100vw", bottom: 0 }}
      >
        <div class="constrained top-container">
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
                onClick={() => runGetUserLocation()}
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
