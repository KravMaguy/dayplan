import React, { useState } from "react";

import { Marker } from "@react-google-maps/api";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import Map from "./Map";
import mapgreypng from "./images/gmapgrey.png";
import { useSelector } from "react-redux";

import {
  startingSearchIndex,
  dimStyle,
  zoom,
  pathVisibilityDefaults,
  containerStyle,
  options,
} from "./planUtils";

const PlanMap = ({
  origin,
  destination,
  currIdx,
  derivedData,
  travelMode,
  setTravelMode,
  setOrigin,
  setResponse,
  response,
  open,
  mapRef,
  performDirections,
}) => {
  const center = useSelector((state) => state.center);
  const wayPoints = [origin, destination];
  const [path, setPath] = useState(null);

  const prevDestination = (e) => {
    e.preventDefault();
    if (currIdx === startingSearchIndex + 1) {
      travelMode === "TRANSIT" && setTravelMode("DRIVING");
      const startingDestination = {
        lat: derivedData[startingSearchIndex].coordinates.latitude,
        lng: derivedData[startingSearchIndex].coordinates.longitude,
      };
      const lastDestination = {
        lat: derivedData[derivedData.length - 1].coordinates.latitude,
        lng: derivedData[derivedData.length - 1].coordinates.longitude,
      };
      performDirections(
        startingSearchIndex,
        startingDestination,
        lastDestination,
        null
      );
    } else {
      const prevOrigin = {
        lat: derivedData[currIdx - 2].coordinates.latitude,
        lng: derivedData[currIdx - 2].coordinates.longitude,
      };
      performDirections(currIdx - 1, prevOrigin, origin, null);
    }
  };

  const nextDestination = (e) => {
    e.preventDefault();
    if (currIdx !== startingSearchIndex) {
      setOrigin(destination);
    }
    const nextDestination = {
      lat: derivedData[currIdx + 1].coordinates.latitude,
      lng: derivedData[currIdx + 1].coordinates.longitude,
    };
    performDirections(currIdx + 1, null, nextDestination, null);
  };

  const getWayPoints = (param) => {
    if (currIdx === startingSearchIndex) {
      const myPoints = derivedData.slice(
        startingSearchIndex + 1,
        derivedData.length - 1
      );
      const thepoints = myPoints.map((destination) => {
        return {
          location: {
            lat: destination.coordinates.latitude,
            lng: destination.coordinates.longitude,
          },
          stopover: true,
        };
      });
      return thepoints;
    } else {
      return null;
    }
  };

  const getLocStr = () => {
    const latlongArr = derivedData.map((x) => {
      return [x.coordinates.latitude, x.coordinates.longitude];
    });
    if (currIdx === 0) {
      return latlongArr.map((e) => e.join(",")).join("/");
    }
    return (
      latlongArr[currIdx - 1].join(",") + "/" + latlongArr[currIdx].join(",")
    );
  };

  return (
    <div className="col col-left side-p-10">
      <div className="plan-map-container">
        <div
          className="map-card-controls"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div id="plan_map_card_controls" style={{ display: "flex" }}>
            <button
              className="map-controls"
              style={currIdx <= 0 ? dimStyle : null}
              disabled={currIdx <= 0 ? true : false}
              onClick={(e) => prevDestination(e)}
            >
              {currIdx === startingSearchIndex + 1 ? "Full Plan" : "Previous"}
            </button>
            <button
              style={currIdx >= derivedData.length - 1 ? dimStyle : null}
              className="map-controls plan-next-btn"
              disabled={currIdx >= derivedData.length - 1 ? true : false}
              onClick={(e) => nextDestination(e)}
            >
              {currIdx === startingSearchIndex ? "Start" : "Next"}
            </button>
          </div>

          <button
            id="gmap_route_link"
            className="pure-material-button-text pink-bg"
          >
            <a
              alt="view this plan on google maps"
              target="blank"
              style={{ display: "flex" }}
              href={`https://www.google.com/maps/dir/${getLocStr()}`}
            >
              {/* <span className="map-link-text-hide">on</span> */}
              <img
                alt="google-directions-link"
                style={{ height: "31px" }}
                src={mapgreypng}
              />
            </a>
          </button>
        </div>
        <main
          // ref={mapRef}
          className={`map-wrapper ${
            open ? "closed-map-control-size" : "open-map-control-size"
          }`}
        >
          <Map
            containerClass="map-container"
            center={center}
            zoom={zoom}
            containerStyle={containerStyle}
          >
            {!response && !path && destination && origin && (
              <DirectionsService
                options={{
                  origin: origin,
                  destination: destination,
                  waypoints: getWayPoints(),
                  travelMode: travelMode,
                }}
                callback={(response) => {
                  if (response !== null) {
                    if (response.status === "OK") {
                      setResponse(response);
                    } else {
                      setPath([origin, destination]);
                    }
                  }
                }}
              />
            )}

            {response !== null && (
              <DirectionsRenderer
                options={{
                  suppressMarkers: !getWayPoints() ? true : false,
                  directions: response,
                  polylineOptions: {
                    strokeColor:
                      currIdx === startingSearchIndex ? "black" : "#604ca6c7",
                    strokeOpacity:
                      currIdx !== startingSearchIndex
                        ? pathVisibilityDefaults.strokeOpacity
                        : null,
                    strokeWeight:
                      currIdx !== startingSearchIndex
                        ? pathVisibilityDefaults.strokeWeight
                        : null,
                  },
                }}
                directions={response}
                panel={document.getElementById(`panel-${currIdx}`)}
              />
            )}
            {!getWayPoints() &&
              wayPoints.map((waypoint, idx) => {
                const letter = String.fromCharCode(
                  "A".charCodeAt(0) + currIdx + idx - 1
                );
                return (
                  <Marker
                    key={idx}
                    position={{
                      lat: waypoint.lat,
                      lng: waypoint.lng,
                    }}
                    label={{ text: letter, color: "white" }}
                  />
                );
              })}
          </Map>
        </main>
      </div>
    </div>
  );
};

export default PlanMap;
