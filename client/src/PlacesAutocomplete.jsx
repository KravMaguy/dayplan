/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import "./Marker.css";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";
import Map from "./Map";
import { StreetViewPanorama } from "@react-google-maps/api";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import { getUserPosition } from "./redux/thunks.js";
import { useNavigate } from "react-router";
import PlaceDrawer from "./PlaceDrawer";
const PlacesAutoComplete = () => {
  const containerStyle = {
    height: "calc(100vh - 60px)",
    position: "relative",
    bottom: "0",
  };
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  useEffect(() => {
    if (!categoryLength) {
      navigate("/categories");
    }
  }, [categoryLength, navigate]);

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
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [place, setPlace] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [streetViewVisible, setStreetViewVisibility] = useState(false);
  const [focused, setFocused] = useState(false);
  const { photos, name, formatted_address, types, website } = place || {};

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
    if (!userCoordinates?.geocodedAddress) {
      return;
    }
    const placeId = userCoordinates?.geocodedAddress[0].place_id;
    console.log(placeId, "here it is");
    setOpenDrawer(true);
    setPlaceId(placeId);
  }, [userCoordinates?.geocodedAddress]);

  function slowOpenSetValue(val) {
    setTimeout(() => {
      setOpenDrawer(true);
    }, 500);
    setValue(val);
  }

  return (
    <div className="user-destination-page">
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen && "active"}
      ></div>
      <PlaceDrawer
        photos={photos}
        drawerOpen={drawerOpen}
        name={name}
        formatted_address={formatted_address}
        types={types}
        website={website}
      />
      <div
        className={`plan-preview-map-container ${
          drawerOpen
            ? "closed-preview-map-control-size"
            : "open-preview-map-control-size"
        }`}
      >
        <div
          className="destination-page-map-container"
          style={{ width: "100%" }}
        >
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

          <Map
            containerClass="map-container"
            center={center}
            zoom={zoom}
            setZoom={setZoom}
            containerStyle={containerStyle}
            placeId={placeId}
            setPlace={setPlace}
            place={place}
            clickedLocation={clickedLocation}
            setClickedLocation={setClickedLocation}
          >
            {clickedLocation && (
              <OverlayView
                position={clickedLocation}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                key={clickedLocation.lat}
              >
                <div className="dot-shadow-clicked">
                  <div className="dot-clicked" title="point of interest">
                    <div className="dot-child-clicked"></div>
                  </div>
                </div>
              </OverlayView>
            )}

            {userCoordinates && (
              <OverlayView
                position={{
                  lat: userCoordinates.center.lat,
                  lng: userCoordinates.center.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="dot-shadow">
                  <div className="dot" title="your location">
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
          <div>
            {clickedLocation && !focused && (
              <div
                className={`place-preview-wrapper  ${
                  !drawerOpen ? "visible-placepreview" : "hidden-placepreview"
                }`}
              >
                <div className="place-preview-img-container">
                  <img
                    style={{
                      boxShadow: "rgb(0 0 0 / 20%) 0px 1px 2px",
                      height: "100px",
                      width: "150px",
                    }}
                    src={`https://maps.googleapis.com/maps/api/streetview?size=150x100&location=${clickedLocation.lat},${clickedLocation.lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
                  />
                </div>

                <div className="lat-lng-return-controls">
                  <h3>Point of Interest</h3>
                  <p>{`lat: ${clickedLocation.lat}`}</p>
                  <p>{`lng: ${clickedLocation.lng}`}</p>

                  <button
                    onClick={() => {
                      dispatch({
                        type: "SET_CENTER",
                        payload: {
                          center: {
                            lat: clickedLocation.lat,
                            lng: clickedLocation.lng,
                          },
                        },
                      });
                      setZoom(15);
                      setTimeout(() => {
                        setStreetViewVisibility(true);
                      }, 2000);
                    }}
                    className="no-link pure-material-button-text"
                  >
                    Go To
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesAutoComplete;
