import React, { useState, useEffect, useCallback, useRef } from "react";
import "./PlanPage.css";
import { startingSearchIndex } from "./planUtils";
import DragPlanDirections from "./DragPlanDirections";
import { useDispatch, useSelector } from "react-redux";
import { getLocationDataByCategories } from "./redux/thunks.js";
import { useNavigate } from "react-router";
import DestinationLinks from "./DestinationLinks";
import PlanMap from "./PlanMap";
import { SkeletonLinks } from "./skeletons";
import { DragPlanSteps, dragPlanTourStyle } from "./TourUtils";
import CustomRide from "./CustomRide";
const viewWidth = window.innerWidth;
console.log({ viewWidth });

const DragPlan = () => {
  const center = useSelector((state) => state.center);
  const data = useSelector((state) => state.data);
  const userCenter = useSelector((state) => state.userCenter);
  const categoryLength = useSelector((state) => state.categories.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setIsOpen] = useState(false);
  const [derivedData, setDerivedData] = useState([]);
  const [currIdx, setIdx] = useState(startingSearchIndex);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(center);
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [collapsed, setCollapsed] = useState(null);
  const [run, setRun] = useState(false);

  const checkMode = (e, mode) => {
    const { target } = e;
    const { checked } = target;
    checked && setTravelMode(mode);
    setResponse(null);
  };
  useEffect(() => {
    const visitedPage = localStorage.getItem("hasSeenDragPlanTour");
    if (derivedData.length > 0 && !visitedPage) {
      localStorage.setItem("hasSeenDragPlanTour", "been here");
      const timeout = setTimeout(() => {
        setRun(true);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [derivedData.length]);

  useEffect(() => {
    dispatch(getLocationDataByCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!categoryLength) {
      navigate("/categories");
    }
  }, [categoryLength, navigate]);

  useEffect(() => {
    if (!userCenter) {
      return navigate("/location");
    }
  }, [userCenter, navigate]);

  useEffect(() => {
    if (data.length > 0 && data) {
      setDerivedData(data);
      const lastDestination = {
        lat: data[data.length - 1].coordinates.latitude,
        lng: data[data.length - 1].coordinates.longitude,
      };
      setDestination(lastDestination);
    }
  }, [data]);

  useEffect(() => {
    const curr = document.getElementById(`panel-${currIdx}`);
    if (curr) {
      curr.innerHTML = "";
    }
  }, [currIdx, travelMode]);

  const mapRef = useRef(null);
  const scrollToMap = useCallback(() => {
    mapRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const newCurr = document.getElementById(`panel-${currIdx}`);
    if (newCurr) {
      newCurr.addEventListener("click", scrollToMap, true);
    }
    return {
      if(newCurr) {
        newCurr.removeEventListener("click", scrollToMap);
      },
    };
  }, [currIdx, travelMode, scrollToMap]);

  const performDirections = (index, origin, destination, response) => {
    (index || index === 0) && setIdx(index);
    origin && setOrigin(origin);
    destination && setDestination(destination);
    setResponse(response);
  };

  const handleSelectBox = (boxIndex) => {
    if (currIdx === collapsed) {
      setCollapsed(null);
    }
    if (boxIndex === currIdx) return;
    const origin = {
      lat: derivedData[boxIndex - 1].coordinates.latitude,
      lng: derivedData[boxIndex - 1].coordinates.longitude,
    };
    const destination = {
      lat: derivedData[boxIndex].coordinates.latitude,
      lng: derivedData[boxIndex].coordinates.longitude,
    };
    performDirections(boxIndex, origin, destination, null);
  };

  const removeLocation = (id) => {
    if (travelMode === "TRANSIT") {
      setTravelMode("DRIVING");
    }
    const index = derivedData.findIndex((obj) => obj.id === id);
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const filteredData = derivedData
      .slice(0, index)
      .concat(derivedData.slice(index + 1));
    setDerivedData(filteredData);

    const destination = {
      lat: filteredData[filteredData.length - 1].coordinates.latitude,
      lng: filteredData[filteredData.length - 1].coordinates.longitude,
    };
    performDirections(0, origin, destination, null);
  };

  return (
    <>
      <div className="whole-page" style={{ position: "relative", top: "60px" }}>
        <div className="row map-plan-row">
          <CustomRide
            styles={dragPlanTourStyle}
            steps={DragPlanSteps}
            run={run}
            continuous={true}
          />
          <PlanMap
            origin={origin}
            destination={destination}
            currIdx={currIdx}
            derivedData={derivedData}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            setOrigin={setOrigin}
            setResponse={setResponse}
            response={response}
            open={open}
            mapRef={mapRef}
            performDirections={performDirections}
          />
          <DragPlanDirections
            open={open}
            setIsOpen={setIsOpen}
            currIdx={currIdx}
            handleSelectBox={handleSelectBox}
            response={response}
            derivedData={derivedData}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            checkMode={checkMode}
            setDerivedData={setDerivedData}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            performDirections={performDirections}
            scrollToMap={scrollToMap}
          />
        </div>
        {derivedData.length > 0 ? (
          <DestinationLinks
            derivedData={derivedData}
            removeLocation={removeLocation}
          />
        ) : (
          <div className="links-holder">
            {new Array(6).fill(null).map((n) => (
              <SkeletonLinks key={n} theme="light" />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DragPlan;
