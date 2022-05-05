import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosition } from "./redux/thunks.js";

const CustomSearchBar = ({
  drawerOpen,
  setFocused,
  setZoom,
  userCoordinates,
  setPlaceId,
  setOpenDrawer,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const userCoordinatesGeoFormattedAddress = useSelector(
    (state) => state.position?.geocodedAddress
  );

  const runGetUserLocation = () => {
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
    slowOpenSetValue(formatted_address);

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
    slowOpenSetValue(val);
    const { label } = val;
    geocodeByAddress(label)
      .then((results) => {
        console.log({ results });
        setPlaceId(results[0].place_id);
        resetMapCenter(results);
      })
      .catch((error) => console.error(error));
  };

  function slowOpenSetValue(val) {
    setTimeout(() => {
      setOpenDrawer(true);
    }, 500);
    setValue(val);
  }

  return (
    <div
      className={`constrained top-container-searchbox ${
        !drawerOpen ? "visible-searchbar" : "hidden-searchbar"
      }`}
    >
      <div className="search-wrap">
        <GooglePlacesAutocomplete
          selectProps={{
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            inputValue,
            value,
            onInputChange: (newInputValue, meta) => {
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
  );
};

export default CustomSearchBar;
