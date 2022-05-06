/* eslint-disable jsx-a11y/alt-text */
import { GoogleMarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import "./planpreview.css";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import { options } from "./planUtils";
import { SkeletonMap } from "./skeletons";
import mapgreypng from "./images/gmapgrey.png";

const containerStyle = {
  height: "100%",
  position: "relative",
  bottom: "0",
};

const PlanPreview = () => {
  const params = useParams();
  const [sharedPlan, setSharedPlan] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState(null);
  const [drawerOpen, setOpenDrawer] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [startLink, setStartLink] = useState(0);
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get("/get_shared_plan", { params });
      const { derivedData } = data;
      setSharedPlan(derivedData);
      const center = {
        latitude: derivedData[0].coordinates.latitude,
        longitude: derivedData[0].coordinates.longitude,
      };
      setCenter(center);
      geocodeByLatLng({
        lat: derivedData[0].coordinates.latitude,
        lng: derivedData[0].coordinates.longitude,
      })
        .then((results) => {
          setStartLink(encodeURI(results[0].formatted_address));
        })
        .catch((error) => console.error(error));
    };
    getUserData();
  }, [params]);

  useEffect(() => {
    if (selectedIdx === 0) return;
    const fetchBuisnessReviews = async () => {
      const id = sharedPlan[selectedIdx].id;
      const { data } = await axios.post("/get_buisness_reviews", { id });
      setReviews(data);
    };
    fetchBuisnessReviews();
  }, [selectedIdx]);

  const setNewCenter = (latitude, longitude) => {
    setCenter({ latitude, longitude });
  };

  // console.log({ sharedPlan });

  return (
    <>
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen && "active"}
      ></div>

      {center && sharedPlan.length > 0 ? (
        <>
          {selectedIdx !== null && (
            <div id="drawer-nav" className={drawerOpen && "active"}>
              <img
                loading="lazy"
                src={
                  selectedIdx === 0
                    ? `https://maps.googleapis.com/maps/api/streetview?size=350x250&location=${startLink}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
                    : sharedPlan[selectedIdx].image_url
                    ? sharedPlan[selectedIdx].image_url
                    : `https://via.placeholder.com/350x250.png?text=Click+Yelp+Link+below+for+more+info`
                }
                className="drawer-image"
              />
              <div className="buisness-details">
                <div class={selectedIdx !== 0 && "scrollbar"}>
                  <div class={selectedIdx !== 0 && "overflow"}>
                    <div className="yelp-stars-container">
                      <div>
                        <img
                          className="yelp-stars"
                          alt=""
                          src="../../web_and_ios/large/large_0@2x.png"
                        />
                      </div>

                      <img
                        className="yelp-dark-bg"
                        alt=""
                        src="../../yelp_logo_dark_bg.png"
                      />
                    </div>
                    <h2>
                      {String.fromCharCode("A".charCodeAt(0) + selectedIdx)}
                      {") "}
                      {sharedPlan[selectedIdx].name}
                    </h2>

                    <p>
                      {selectedIdx === 0
                        ? decodeURI(startLink)
                        : sharedPlan?.[
                            selectedIdx
                          ]?.location?.display_address.join(", ")}
                    </p>
                    {selectedIdx !== 0 && (
                      <>
                        {" "}
                        <div className="pill-categories-container">
                          {sharedPlan?.[selectedIdx].categories.map(
                            (category) => (
                              <div className="buisness-pills">
                                {category.title}
                              </div>
                            )
                          )}
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className={`plan-preview-map-container plans-page ${
              drawerOpen
                ? "closed-preview-map-control-size"
                : "open-preview-map-control-size"
            }`}
          >
            {/* <button className="plans-preview-controls">hi this is stuff</button> */}
            <div className="map-card-controls plans-preview-controls">
              <div style={{ display: "flex" }}>
                <button
                  className="map-controls"
                  // style={currIdx <= 0 ? dimStyle : null}
                  // disabled={currIdx <= 0 ? true : false}
                  // onClick={() => prevDestination()}
                >
                  {/* {currIdx === startingSearchIndex + 1 ? "Full Plan" : "Previous"} */}
                  Previous
                </button>
                <button
                  // style={currIdx >= derivedData.length - 1 ? dimStyle : null}
                  className="map-controls plan-next-btn"
                  // disabled={currIdx >= derivedData.length - 1 ? true : false}
                  // onClick={() => nextDestination()}
                  onClick={() => {
                    setZoom(14);

                    if (!selectedIdx && selectedIdx !== 0) {
                      setSelectedIdx(0);
                      console.clear();

                      const { latitude, longitude } = sharedPlan[0].coordinates;
                      console.log({ latitude });
                      setNewCenter(latitude, longitude);
                    } else {
                      setSelectedIdx(selectedIdx + 1);
                      const { latitude, longitude } =
                        sharedPlan[selectedIdx + 1].coordinates;
                      setNewCenter(latitude, longitude);
                    }
                    setOpenDrawer(true);
                  }}
                >
                  {/* {currIdx === startingSearchIndex ? "Start" : "Next"} */}
                  Next
                </button>
              </div>

              <button className="pure-material-button-text pink-bg">
                <a
                  alt="view this plan on google maps"
                  target="blank"
                  style={{ display: "flex" }}
                  // href={`https://www.google.com/maps/dir/${getLocStr()}`}
                >
                  <span className="map-link-text-hide">View plan on</span>
                  <img
                    alt="google directions link"
                    style={{ height: "31px" }}
                    src={mapgreypng}
                  />
                </a>
              </button>
            </div>

            <Map
              zoom={zoom}
              setZoom={setZoom}
              center={{ lat: center.latitude, lng: center.longitude }}
              containerStyle={containerStyle}
            >
              <GoogleMarkerClusterer options={options}>
                {(clusterer) =>
                  sharedPlan.map((location, idx) => {
                    const letter = String.fromCharCode("A".charCodeAt(0) + idx);
                    return (
                      <Marker
                        label={{ text: letter, color: "white" }}
                        onClick={() => {
                          setSelectedIdx(idx);

                          setNewCenter(
                            location.coordinates.latitude,
                            location.coordinates.longitude
                          );
                          setTimeout(() => {
                            setOpenDrawer(true);
                          }, 400);
                        }}
                        key={idx}
                        position={{
                          lat: location.coordinates.latitude,
                          lng: location.coordinates.longitude,
                        }}
                        clusterer={clusterer}
                      />
                    );
                  })
                }
              </GoogleMarkerClusterer>
            </Map>
          </div>
        </>
      ) : (
        <SkeletonMap theme="light" />
      )}
    </>
  );
};

export default PlanPreview;
