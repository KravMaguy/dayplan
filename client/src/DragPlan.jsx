import React, { useState, useEffect, useCallback, useRef } from "react";
import "./PlanPage.css";

import { startingSearchIndex } from "./planUtils";
import DragPlanDirections from "./DragPlanDirections";
import { useDispatch, useSelector } from "react-redux";
import { getLocationDataByCategories } from "./redux/thunks.js";
import { useNavigate } from "react-router";
import DestinationLinks from "./DestinationLinks";
import PlanMap from "./PlanMap";
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

  const checkDriving = ({ target: { checked } }) => {
    checked && setTravelMode("DRIVING");
    setResponse(null);
  };

  const checkBicycling = ({ target: { checked } }) => {
    checked && setTravelMode("BICYCLING");
    setResponse(null);
  };

  const checkTransit = ({ target: { checked } }) => {
    checked && setTravelMode("TRANSIT");
    setResponse(null);
  };

  const checkWalking = ({ target: { checked } }) => {
    checked && setTravelMode("WALKING");
    setResponse(null);
  };

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
  const logMsg = useCallback(() => {
    mapRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const newCurr = document.getElementById(`panel-${currIdx}`);
    if (newCurr) {
      newCurr.addEventListener("click", logMsg, true);
    }
    return {
      if(newCurr) {
        newCurr.removeEventListener("click", logMsg);
      },
    };
  }, [currIdx, travelMode, logMsg]);

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
    setIdx(boxIndex);
    setOrigin(origin);
    setDestination(destination);
    setResponse(null);
  };

  const removeLocation = (id) => {
    const index = derivedData.findIndex((obj) => obj.id === id);
    const origin = {
      lat: derivedData[0].coordinates.latitude,
      lng: derivedData[0].coordinates.longitude,
    };
    const filteredData = derivedData
      .slice(0, index)
      .concat(derivedData.slice(index + 1));
    setDerivedData(filteredData);
    setIdx(0);

    const destination = {
      lat: filteredData[filteredData.length - 1].coordinates.latitude,
      lng: filteredData[filteredData.length - 1].coordinates.longitude,
    };
    setOrigin(origin);
    setDestination(destination);
    setResponse(null);
  };

  return (
    <>
      <div className="whole-page" style={{ position: "relative", top: "60px" }}>
        <div className="row map-plan-row">
          <PlanMap
            origin={origin}
            destination={destination}
            currIdx={currIdx}
            derivedData={derivedData}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            setIdx={setIdx}
            setOrigin={setOrigin}
            setDestination={setDestination}
            setResponse={setResponse}
            response={response}
            open={open}
            mapRef={mapRef}
          />
          <DragPlanDirections
            open={open}
            setIsOpen={setIsOpen}
            currIdx={currIdx}
            setIdx={setIdx}
            handleSelectBox={handleSelectBox}
            response={response}
            derivedData={derivedData}
            setResponse={setResponse}
            setOrigin={setOrigin}
            setDestination={setDestination}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            checkBicycling={checkBicycling}
            checkWalking={checkWalking}
            checkTransit={checkTransit}
            checkDriving={checkDriving}
            setDerivedData={setDerivedData}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>
        {!open && (
          <DestinationLinks
            derivedData={derivedData}
            removeLocation={removeLocation}
          />
        )}
      </div>
    </>
  );
};

export default DragPlan;
