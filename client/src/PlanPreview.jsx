/* eslint-disable jsx-a11y/alt-text */
import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";
import "./planpreview.css";
import { geocodeByLatLng } from "react-google-places-autocomplete";

const containerStyle = {
  height: `100vh`,
};
const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
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
  console.log({ reviews });
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.post("/get_shared_plan", { params });
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
          console.log(encodeURI(results[0].formatted_address), "here the reus");
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

  return (
    <>
      <div
        id="overlay"
        onClick={() => setOpenDrawer(false)}
        className={drawerOpen && "active"}
      ></div>
      {center && sharedPlan.length > 0 && (
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

                    <h2>{sharedPlan[selectedIdx].name}</h2>

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
                                console.log({ review });
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
                          {/* Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Faucibus interdum posuere lorem
                          ipsum dolor sit. Eu facilisis sed odio morbi quis
                          commodo. Aenean euismod elementum nisi quis eleifend
                          quam adipiscing vitae. Viverra maecenas accumsan lacus
                          vel facilisis volutpat. Arcu cursus vitae congue
                          mauris rhoncus aenean vel elit. Pellentesque
                          adipiscing commodo elit at. Eu ultrices vitae auctor
                          eu augue ut lectus. Lacinia quis vel eros donec. At
                          tellus at urna condimentum mattis pellentesque id
                          nibh. Purus in mollis nunc sed. Ipsum dolor sit amet
                          consectetur adipiscing elit pellentesque. Lorem ipsum
                          dolor sit amet consectetur adipiscing elit duis
                          tristique. Metus aliquam eleifend mi in. Ut sem
                          viverra aliquet eget sit amet. Dictum non consectetur
                          a erat nam. Donec ac odio tempor orci dapibus ultrices
                          in iaculis. A condimentum vitae sapien pellentesque
                          habitant morbi. Consectetur adipiscing elit duis
                          tristique sollicitudin nibh. Nec tincidunt praesent
                          semper feugiat nibh sed pulvinar proin. Augue interdum
                          velit euismod in pellentesque massa placerat.
                          Tincidunt eget nullam non nisi est sit amet facilisis
                          magna. Maecenas volutpat blandit aliquam etiam. Purus
                          semper eget duis at tellus at urna condimentum mattis.
                          Gravida arcu ac tortor dignissim convallis aenean et
                          tortor. Dolor sit amet consectetur adipiscing elit.
                          Adipiscing vitae proin sagittis nisl. */}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Map
            zoom={zoom}
            setZoom={setZoom}
            center={{ lat: center.latitude, lng: center.longitude }}
            containerStyle={containerStyle}
          >
            <MarkerClusterer options={options}>
              {(clusterer) =>
                sharedPlan.map((location, idx) => (
                  <Marker
                    onClick={() => {
                      setSelectedIdx(idx);

                      setNewCenter(
                        location.coordinates.latitude,
                        location.coordinates.longitude
                      );
                      setOpenDrawer(true);
                    }}
                    key={idx}
                    position={{
                      lat: location.coordinates.latitude,
                      lng: location.coordinates.longitude,
                    }}
                    clusterer={clusterer}
                  />
                ))
              }
            </MarkerClusterer>
          </Map>
        </>
      )}
    </>
  );
};

export default PlanPreview;
