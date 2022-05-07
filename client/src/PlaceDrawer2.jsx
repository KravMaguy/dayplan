/* eslint-disable jsx-a11y/alt-text */
const PlaceDrawer2 = ({
  drawerOpen,
  selectedIdx,
  startLink,
  sharedPlan,
  reviews,
}) => {
  return (
    <div
      id="drawer-nav"
      className={`plan-preview-nav  ${drawerOpen ? "active" : ""}`}
    >
      <img
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
                : sharedPlan?.[selectedIdx]?.location?.display_address.join(
                    ", "
                  )}
            </p>
            {selectedIdx !== 0 && (
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
                              <a style={{ color: "#7fafff" }} href={review.url}>
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
  );
};

export default PlaceDrawer2;
