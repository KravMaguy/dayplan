import { travelModeValues } from "./planUtils";
import { RiBikeLine, RiCarLine, RiBusLine, RiWalkLine } from "react-icons/ri";

const TravelModes = ({
  travelMode,
  checkMode,
  currIdx,
  setIsOpen,
  resetForm,
  open,
}) => {
  return (
    <form className="bg-grey-plan-controls">
      <div id="travel_radio_wrapper" className="radio-wrapper">
        <label htmlFor={travelModeValues.BICYCLING}>
          <input
            type="radio"
            name={travelModeValues.BICYCLING}
            className="bicycling"
            id={travelModeValues.BICYCLING}
            checked={travelMode === travelModeValues.BICYCLING}
            onChange={(e) => checkMode(e, travelModeValues.BICYCLING)}
            value={travelModeValues.BICYCLING}
          />
          <RiBikeLine className="travel-modes" />
        </label>

        <label htmlFor={travelModeValues.TRANSIT}>
          <input
            disabled={currIdx === 0}
            type="radio"
            name={travelModeValues.TRANSIT}
            className="transit"
            id={travelModeValues.TRANSIT}
            checked={travelMode === travelModeValues.TRANSIT}
            onChange={(e) => checkMode(e, travelModeValues.TRANSIT)}
            value={travelModeValues.TRANSIT}
          />
          <RiBusLine className="travel-modes" />
        </label>

        <label htmlFor={travelModeValues.WALKING}>
          <input
            type="radio"
            name={travelModeValues.WALKING}
            className="walking"
            id={travelModeValues.WALKING}
            checked={travelMode === travelModeValues.WALKING}
            onChange={(e) => checkMode(e, travelModeValues.WALKING)}
            value={travelModeValues.WALKING}
          />
          <RiWalkLine className="travel-modes" />
        </label>

        <label htmlFor={travelModeValues.DRIVING}>
          <input
            type="radio"
            name={travelModeValues.DRIVING}
            id={travelModeValues.DRIVING}
            className="driving"
            checked={travelMode === travelModeValues.DRIVING}
            onChange={(e) => checkMode(e, travelModeValues.DRIVING)}
            value={travelModeValues.DRIVING}
          />
          <RiCarLine className="travel-modes" />
        </label>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!open);
          }}
          className="no-link small-ui pure-material-button-text"
        >
          {!open ? "Close" : "Open"}
        </button>
        <button
          onClick={(e) => resetForm(e)}
          className="no-link pure-material-button-text"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default TravelModes;
