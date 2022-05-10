import { useDispatch } from "react-redux";

const PlacePreview = ({ drawerOpen, clickedLocation, setZoom, focused }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`place-preview-wrapper  ${
        !drawerOpen && !focused ? "visible-placepreview" : "hidden-placepreview"
      }`}
    >
      <div className="place-preview-img-container">
        <img
          alt="place preview streetview"
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
              //   setStreetViewVisibility(true);
            }, 2000);
          }}
          className="no-link pure-material-button-text"
        >
          Go To
        </button>
      </div>
    </div>
  );
};

export default PlacePreview;
