import { IoIosBicycle, IoIosCar, IoIosBus, IoIosWalk } from "react-icons/io";
const TravelModes = ({
  travelMode,
  checkBicycling,
  checkDriving,
  checkTransit,
  checkWalking,
  currIdx,
  setIsOpen,
  resetForm,
  open,
}) => {
  return (
    <form className="bg-grey-plan-controls">
      <div className="radio-wrapper">
        <label htmlFor="DRIVING">
          <input
            type="radio"
            name="DRIVING"
            id="DRIVING"
            className="driving"
            checked={travelMode === "DRIVING"}
            onChange={checkDriving}
            value="DRIVING"
          />
          <IoIosCar className="travel-modes" />
        </label>

        <label htmlFor="BICYCLING">
          <input
            type="radio"
            name="BICYCLING"
            className="bicycling"
            id="BICYCLING"
            checked={travelMode === "BICYCLING"}
            onChange={checkBicycling}
            value="BICYCLING"
          />
          <IoIosBicycle className="travel-modes" />
        </label>

        <label htmlFor="TRANSIT">
          <input
            disabled={currIdx === 0}
            type="radio"
            name="TRANSIT"
            className="transit"
            id="TRANSIT"
            checked={travelMode === "TRANSIT"}
            onChange={checkTransit}
            value="TRANSIT"
          />
          <IoIosBus className="travel-modes" />
        </label>

        <label htmlFor="WALKING">
          <input
            type="radio"
            name="WALKING"
            className="walking"
            id="WALKING"
            checked={travelMode === "WALKING"}
            onChange={checkWalking}
            value="WALKING"
          />
          <IoIosWalk className="travel-modes" />
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
