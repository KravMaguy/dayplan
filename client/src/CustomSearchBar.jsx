import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosition } from "./redux/thunks.js";

const CustomSearchBar = ({
  setOpenFullSearch,
  drawerOpen,
  setFocused,
  setZoom,
  userCoordinates,
  setPlaceId,
  setShowToast,
  setExactDate,
  slowOpenSetValue,
  value,
  setRun,
}) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const userCoordinatesGeoFormattedAddress = useSelector(
    (state) => state.position?.geocodedAddress
  );

  const geoLocationStatus = useSelector((state) => state.geolocation_status);
  useEffect(() => {
    if (userCoordinates) return;
    if (geoLocationStatus === "granted") {
      return setShowToast(true);
    }
  }, [geoLocationStatus, userCoordinates, setShowToast]);

  const runGetUserLocation = () => {
    setExactDate(Date.now());
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
    slowOpenSetValue(formatted_address, 500);
    if (userCoordinates?.geocodedAddress) {
      const placeId = userCoordinates?.geocodedAddress[0].place_id;
      setPlaceId(placeId);
    }
  };

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
    slowOpenSetValue(val, 500);
    const { label } = val;
    geocodeByAddress(label)
      .then((results) => {
        setPlaceId(results[0].place_id);
        resetMapCenter(results);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={`constrained top-container-searchbox ${
        !drawerOpen ? "visible-searchbar" : "hidden-searchbar"
      }`}
    >
      <div className="search-wrap my-first-step">
        <GooglePlacesAutocomplete
          disabled={drawerOpen}
          selectProps={{
            onFocus: () => {
              setFocused(true);
              // setRun(false);
            },
            onBlur: () => {
              setFocused(false);
            },
            inputValue,
            value,
            onInputChange: (newInputValue, meta) => {
              setInputValue(newInputValue);
            },
            placeholder: (
              <span style={{ fontWeight: 100 }}>choose location</span>
            ),
            onChange: (val) => handleSelect(val),
          }}
          apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
        />
      </div>

      <div
        onClick={() => runGetUserLocation()}
        className={`second-step ${
          userCoordinates ? "icon icon-bg-green" : "icon"
        }`}
      >
        {!userCoordinates ? (
          <MdLocationOff className="location-icon" fill={"#d3d3d3"} />
        ) : (
          <MdLocationOn fill={"green"} className="location-icon" />
        )}
      </div>
    </div>
  );
};

export default CustomSearchBar;
