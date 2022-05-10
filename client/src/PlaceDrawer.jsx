import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PerfectImage from "./PerfectImage";
import { SkeletonPlaceDetails } from "./skeletons";
const PlaceDrawer = ({
  photos,
  drawerOpen,
  name,
  formatted_address,
  types,
  website,
}) => {
  const navigate = useNavigate();
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  return (
    <div id="drawer-nav" tabindex="-1" className={drawerOpen ? "active" : ""}>
      <div className="cls-image-container">
        <PerfectImage photos={photos} drawerOpen={drawerOpen} />
      </div>

      <div className="buisness-details">
        <div>
          <div>
            <div className="yelp-stars-container">
              <button
                disabled={!userCenter && !userCoordinates}
                onClick={() => navigate("/plan")}
                className="no-link pure-material-button-text generate-plan-link"
              >
                Create Plan
              </button>

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
            {!name ? (
              <SkeletonPlaceDetails theme={"dark"} />
            ) : (
              <>
                <h2>{name}</h2>
                <p>{formatted_address}</p>
                <div className="pill-categories-container">
                  {types &&
                    types.length > 0 &&
                    types.map((category) => (
                      <div className="buisness-pills" key={category}>
                        {category}
                      </div>
                    ))}
                </div>
                {website && (
                  <div className="external-website">
                    <a href={website}>{website}</a>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDrawer;
