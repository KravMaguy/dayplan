import { useNavigate } from "react-router";
import { SkeletonImage } from "./skeletons";

const PlaceDrawer = ({
  photos,
  drawerOpen,
  name,
  formatted_address,
  types,
  website,
}) => {
  const navigate = useNavigate();
  return (
    <div id="drawer-nav" className={drawerOpen && "active"}>
      {photos && photos.length > 0 && photos[0].getUrl() ? (
        <img alt="place" src={photos[0].getUrl()} className="drawer-image" />
      ) : (
        <SkeletonImage />
      )}
      <div className="buisness-details">
        <div>
          <div>
            <div className="yelp-stars-container">
              <button
                onClick={() => navigate("/plan")}
                className="no-link pure-material-button-text green-bg-btn generate-plan-link"
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
            <h2>{name}</h2>
            <p>{formatted_address}</p>
            <div className="pill-categories-container">
              {types &&
                types.length > 0 &&
                types.map((category) => (
                  <div className="buisness-pills">{category}</div>
                ))}
            </div>

            {website && (
              <div className="external-website">
                <a href={website}>{website}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDrawer;
