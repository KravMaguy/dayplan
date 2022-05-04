import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const Map = React.memo(function Map(props) {
  const [map, setMap] = useState(null);
  const state = useSelector((state) => state);
  console.log({ state });
  const { center, zoom, setZoom, containerStyle, mapStyle, placeId } = props;
  const location = useLocation();
  const { pathname } = location;

  const onLoad = useCallback(
    function onLoad(map) {
      setMap(map);
    },
    [setMap]
  );

  React.useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [map, center]);

  useEffect(() => {
    if (!map || !placeId) {
      return;
    }
    const request = {
      placeId,
    };
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(request, callback);
    function callback(place, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // console.log(place?.photos[0]?.getUrl());
        console.log({ place });
      } else {
        console.log("not ok");
      }
    }
  }, [map, placeId]);

  return (
    <GoogleMap
      options={{
        clickableIcons: true,
        disableDefaultUI: true,
        styles: mapStyle,
      }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onZoomChanged={() => {
        if (map === null) {
          return;
        }
        if (map.zoom !== zoom && pathname !== "/plan") {
          setZoom(map.zoom);
        }
      }}
      onCenterChanged={() => {
        if (map) {
          // console.log(map.getCenter());
          return;
        }
      }}
      onLoad={onLoad}
    >
      <>{props.children}</>
    </GoogleMap>
  );
});

export default Map;
