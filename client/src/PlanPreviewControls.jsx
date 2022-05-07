/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import mapgreypng from "./images/gmapgrey.png";

const PlanPreviewControls = ({
  selectedIdx,
  setSelectedIdx,
  sharedPlan,
  setNewCenter,
  setOpenDrawer,
  setZoom,
  drawerOpen,
}) => {
  const getLocStr = () => {
    const latlongArr = sharedPlan.map((x) => {
      return [x.coordinates.latitude, x.coordinates.longitude];
    });
    return latlongArr.map((e) => e.join(",")).join("/");

    // if (!drawerOpen) {
    //   return latlongArr.map((e) => e.join(",")).join("/");
    // }
    // return (
    //   latlongArr[selectedIdx - 1].join(",") +
    //   "/" +
    //   latlongArr[selectedIdx].join(",")
    // );
  };

  return (
    <div className={`map-card-controls plans-preview-controls`}>
      <div style={{ display: "flex" }}>
        <button
          className="map-controls"
          disabled={selectedIdx === 0 || !selectedIdx ? true : false}
          onClick={() => {
            setSelectedIdx(selectedIdx - 1);
            const { latitude, longitude } =
              sharedPlan[selectedIdx - 1].coordinates;
            setNewCenter(latitude, longitude);
            setOpenDrawer(true);
          }}
        >
          Previous
        </button>
        <button
          className="map-controls plan-next-btn"
          disabled={selectedIdx >= sharedPlan.length - 1 ? true : false}
          onClick={() => {
            let idx;
            setZoom(14);
            if (!selectedIdx && selectedIdx !== 0) {
              idx = 0;
            } else {
              idx = selectedIdx + 1;
            }
            setSelectedIdx(idx);
            const { latitude, longitude } = sharedPlan[idx].coordinates;
            setNewCenter(latitude, longitude);
            setOpenDrawer(true);
          }}
        >
          Next
        </button>
      </div>

      <button className="pure-material-button-text pink-bg plan-preview-btn">
        <a
          alt="view this plan on google maps"
          target="blank"
          style={{ display: "flex" }}
          href={`https://www.google.com/maps/dir/${getLocStr()}`}
        >
          <span className="map-link-text-hide">View full plan</span>
          <img
            alt="google directions link"
            style={{ height: "31px" }}
            src={mapgreypng}
          />
        </a>
      </button>
    </div>
  );
};

export default PlanPreviewControls;
