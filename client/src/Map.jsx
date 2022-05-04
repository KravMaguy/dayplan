import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLocation } from "react-router";

const Map = React.memo(function Map(props) {
  const [map, setMap] = useState(null);
  const onLoad = useCallback(
    function onLoad(map) {
      setMap(map);
    },
    [setMap]
  );

  const location = useLocation();
  useEffect(() => {
    if (map) {
      var request = {
        placeId: "ChIJW7W8hDrOD4gRjpzHa_bGbaw",
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
    }
  }, [map]);

  const { pathname } = location;

  const { center, zoom, setZoom, containerStyle, mapStyle, setCenter } = props;

  React.useEffect(() => {
    if (map) {
      map.panTo(center);
    }
  }, [map, center]);

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
