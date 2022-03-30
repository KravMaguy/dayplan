import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

export default function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoadMap = useCallback(setMap, []); // set map once map has loaded

  const { center, zoom, setZoom, containerStyle } = props;

  return (
    <GoogleMap
      options={{ clickableIcons: true, disableDefaultUI: true }}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onZoomChanged={() => {
        if (map === null) {
          return;
        }
        if (map.zoom !== zoom) {
          setZoom(map.zoom);
        }
      }}
      onLoad={onLoadMap}
    >
      <>{props.children}</>
    </GoogleMap>
  );
}
