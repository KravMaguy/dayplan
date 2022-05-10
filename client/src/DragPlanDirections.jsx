import { useState, useEffect } from "react";
import { RiDragMove2Line } from "react-icons/ri";
import { formatDuration, intervalToDuration } from "date-fns";
import TravelModes from "./TravelModes";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import DragDropContent from "./DragDropContent";
import { highlightedColor, travelModeStrings } from "./planUtils";
import { SkeletonAddress, SkeletonLinks } from "./skeletons";
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragPlanDirections = ({
  handleSelectBox,
  currIdx,
  response,
  derivedData,
  setDerivedData,
  travelMode,
  setTravelMode,
  checkMode,
  collapsed,
  setCollapsed,
  open,
  setIsOpen,
  performDirections,
  scrollToMap,
}) => {
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [startLink, setStartLink] = useState("");
  const [originalData, setOriginalData] = useState(null);

  const onDragEnd = (result) => {
    if (travelMode === "TRANSIT") {
      setTravelMode("DRIVING");
    }
    if (!result.destination) {
      return;
    }
    const newItems = reorder(
      derivedData.slice(1),
      result.source.index,
      result.destination.index
    );
    setDerivedData([derivedData[0], ...newItems]);
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const destination = {
      lat: newItems[newItems.length - 1].coordinates.latitude,
      lng: newItems[newItems.length - 1].coordinates.longitude,
    };

    performDirections(0, origin, destination, null);
    scrollToMap();
  };

  useEffect(() => {
    if (derivedData.length > 0) {
      geocodeByLatLng({
        lat: derivedData[0]?.coordinates.latitude,
        lng: derivedData[0]?.coordinates.longitude,
      })
        .then((results) => {
          setStartLink(results[0].formatted_address);
        })
        .catch((error) => console.error(error));
    }
  }, [derivedData]);

  useEffect(() => {
    if (!response) return;
    let totalDist = 0;
    let totalTime = 0;
    const myroute = response.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
      totalDist += myroute.legs[i].distance.value;
      totalTime += myroute.legs[i].duration.value;
    }
    setDistance(totalDist);
    setTime(totalTime);
  }, [response]);

  const viewFullPlan = () => {
    if (currIdx === 0) return;
    travelMode === "TRANSIT" && setTravelMode("DRIVING");
    const lastDestination = {
      lat: derivedData[derivedData.length - 1].coordinates.latitude,
      lng: derivedData[derivedData.length - 1].coordinates.longitude,
    };
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    performDirections(0, origin, lastDestination, null);
  };

  function humanDuration(time) {
    return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
  }

  useEffect(() => {
    if (!originalData && derivedData.length > 0) {
      setOriginalData(derivedData);
    }
  }, [derivedData, originalData]);

  const resetForm = (e) => {
    e.preventDefault();
    setDerivedData(originalData);
    const origin = {
      lat: originalData[0].coordinates.latitude,
      lng: originalData[0].coordinates.longitude,
    };
    const lastDestination = {
      lat: originalData[originalData.length - 1].coordinates.latitude,
      lng: originalData[originalData.length - 1].coordinates.longitude,
    };
    performDirections(0, origin, lastDestination, null);
  };

  return (
    <div className="col plan-col-right">
      <div
        className={`${
          !open
            ? "plan-directions-container"
            : "plan-directions-container no-bottom-pad"
        }`}
      >
        <div className="plan-inner-container">
          <TravelModes
            travelMode={travelMode}
            checkMode={checkMode}
            currIdx={currIdx}
            setIsOpen={setIsOpen}
            resetForm={resetForm}
            open={open}
          />
          <div
            style={{
              color: "white",
              textShadow: "1px 1px 2px #000000",
              background: currIdx === 0 && highlightedColor,
            }}
            className="plan-card-shell align-left plan-top-card"
            onClick={() => viewFullPlan()}
          >
            <div className="plan-flex-container">
              <div className="mdc-card-wrapper__text-section">
                <div className="demo-card__title">
                  <div
                    className={`numberCircle greyish-bg                 white-border`}
                  >
                    {derivedData.length - 1}
                  </div>
                  <span className="text font-big">Total Locations</span>
                </div>
                <div className="">
                  {`${travelModeStrings[travelMode]} ${
                    distance &&
                    Math.round((distance / 1000 / 1.609) * 100) / 100
                  }`}{" "}
                  miles
                </div>
                <div className="">{time && humanDuration(time)}</div>
              </div>
            </div>
          </div>
          {false && derivedData.length > 0 ? (
            <div className="dnd-text">
              <div className="demo-card__title">
                <div className="numberCircle red-bg white-border">A</div>
                <span className="text">{startLink}</span>
              </div>
            </div>
          ) : (
            <SkeletonAddress theme="dark" />
          )}
          <div className={open ? "hidden" : ""}>
            {true || derivedData.length === 0 || !derivedData ? (
              <SkeletonLinks theme="dark" titleClass="draggable-title" />
            ) : (
              <div className="dnd-text dnd-title">
                <div className="demo-card__title" style={{ display: "flex" }}>
                  <RiDragMove2Line
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "3px",
                      filter: "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4))",
                    }}
                  />

                  <div>dᵣₐg ₙd dᵣₒₚ</div>
                </div>
              </div>
            )}

            <DragDropContent
              onDragEnd={onDragEnd}
              derivedData={derivedData}
              currIdx={currIdx}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              handleSelectBox={handleSelectBox}
            />
          </div>
        </div>
        {/* <div className="fadedScroller_fade"></div> */}
      </div>
    </div>
  );
};

export default DragPlanDirections;
