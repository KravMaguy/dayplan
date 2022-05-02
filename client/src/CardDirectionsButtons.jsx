import { startingSearchIndex, dimStyle } from "./planUtils";

const CardDirectionsButtons = ({
  currIdx,
  prevDestination,
  derivedData,
  nextDestination,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        className="map-controls"
        style={currIdx <= 0 ? dimStyle : null}
        disabled={currIdx <= 0 ? true : false}
        onClick={() => prevDestination()}
      >
        {currIdx === startingSearchIndex + 1 ? "Full Plan" : "Previous"}
      </button>
      <button
        style={currIdx >= derivedData.length - 1 ? dimStyle : null}
        className="map-controls plan-next-btn"
        disabled={currIdx >= derivedData.length - 1 ? true : false}
        onClick={() => nextDestination()}
      >
        {currIdx === startingSearchIndex ? "Start" : "Next"}
      </button>
    </div>
  );
};

export default CardDirectionsButtons;
