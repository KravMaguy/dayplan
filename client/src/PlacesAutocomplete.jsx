/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import { OverlayView } from "@react-google-maps/api";
import "./Marker.css";
import "./planpreview.css";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "@react-google-maps/api";
import Map from "./Map";
import { StreetViewPanorama } from "@react-google-maps/api";
import { MdLocationOff, MdLocationOn } from "react-icons/md";
import { getUserPosition } from "./redux/thunks.js";
// import { FaDirections } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaStreetView } from "react-icons/fa";

const PlacesAutoComplete = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const containerStyle = {
    height: `${height - 60}px`,
  };
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  useEffect(() => {
    if (!categoryLength) {
      navigate("/categories");
    }
  }, [categoryLength, navigate]);

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
  const userCenter = useSelector((state) => state.userCenter);
  const [zoom, setZoom] = useState(10);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [place, setPlace] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [streetViewVisible, setStreetViewVisibility] = useState(false);
  // const [showSearchBar, setShowSearchBar] = useState(true);
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
    slowOpenSetValue(null);
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
  };

  useEffect(() => {
    if (!userCenter?.geocodedAddress && !userCoordinates?.geocodedAddress) {
      return;
    }
    const placeId =
      userCoordinates?.geocodedAddress[0].place_id ||
      userCenter?.geocodedAddress[0].place_id;
    setPlaceId(placeId);
  }, [userCenter?.geocodedAddress, userCoordinates?.geocodedAddress]);

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

      <div id="drawer-nav" className={drawerOpen && "active"}>
        <img
          loading="lazy"
          src={
            place?.photos
              ? place?.photos[0].getUrl()
              : `https://via.placeholder.com/350x250.png?text=Click+Yelp+Link+below+for+more+info`
          }
          // src={
          // selectedIdx === 0
          //   ? `https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${startLink}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
          //   : sharedPlan[selectedIdx].image_url
          //   ? sharedPlan[selectedIdx].image_url
          //   : `https://via.placeholder.com/350x250.png?text=Click+Yelp+Link+below+for+more+info`
          // }
          className="drawer-image"
        />
        <div className="buisness-details">
          <div class={{}}>
            <div class={{}}>
              <div className="yelp-stars-container">
                <button
                  onClick={() => navigate("/plan")}
                  className="no-link pure-material-button-text green-bg-btn"
                >
                  Create Plan
                </button>

                {/* <img className="yelp-dark-bg" alt="" src="../../google.png" /> */}
                <a
                  title="Google Inc., Public domain, via Wikimedia Commons"
                  href="https://commons.wikimedia.org/wiki/File:Google_2015_logo.svg"
                >
                  <img
                    width="256"
                    alt="Google 2015 logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/256px-Google_2015_logo.svg.png"
                    className="yelp-dark-bg"
                  />
                </a>
              </div>
              <h2>{place?.name}</h2>
              <p>{place?.formatted_address}</p>
              <div className="pill-categories-container">
                {place?.types.map((category) => (
                  <div className="buisness-pills">{category}</div>
                ))}
              </div>

              {place?.website && (
                <div className="external-website">
                  <a href={place.website}>{place.website}</a>
                </div>
              )}

              {/* <p>
                  {selectedIdx === 0
                    ? decodeURI(startLink)
                    : sharedPlan?.[selectedIdx]?.location?.display_address.join(
                        ", "
                      )}
                </p> */}
              {/* {selectedIdx !== 0 && (
                  <>
                    {" "}
                    <div className="pill-categories-container">
                      {sharedPlan?.[selectedIdx].categories.map((category) => (
                        <div className="buisness-pills">{category.title}</div>
                      ))}
                    </div>
                    <div className="reviews-container">
                      <h4
                        style={{
                          textDecoration: "underline",
                          marginBottom: "5px",
                        }}
                      >
                        Reviews
                      </h4>
                      {selectedIdx !== 0 &&
                      reviews &&
                      reviews?.reviews.length > 0 ? (
                        <>
                          {reviews.reviews.map((review) => {
                            return (
                              <div
                                style={{
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                }}
                              >
                                <p>{review.user.name}</p>
                                <p>
                                  {review.text}{" "}
                                  <a
                                    style={{ color: "#7fafff" }}
                                    href={review.url}
                                  >
                                    (read more)
                                  </a>
                                </p>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        "loading..."
                      )}
                    </div>
                  </>
                )} */}
            </div>
          </div>
        </div>
      </div>

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
                  // onFocus: () => console.log("focused"),
                  // onBlur: () => console.log("blur"),
                  inputValue,
                  value,
                  onInputChange: (newInputValue, meta) => {
                    console.log("on input change");
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

          {/* {(userCoordinates || userCenter) && (
            <div
              className="constrained"
              style={{
                position: "absolute",
                bottom: "30px",
                zIndex: 1,
                left: "15px",
                height: "50px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  fontSize: "x-large",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                }}
                onClick={() => navigate("/plan")}
              >
                Create Plan
              </button>
            </div>
          )} */}
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
            {/* <StreetViewPanorama
              position={clickedLocation && clickedLocation}
              visible={streetViewVisible}
            /> */}

            {clickedLocation && (
              <OverlayView
                position={clickedLocation}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                key={clickedLocation.lat}
              >
                <div className="dot-shadow-clicked">
                  <div className="dot-clicked">
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
            {clickedLocation && (
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
                    Center
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
