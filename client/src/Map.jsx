import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: `calc(90vh - 62px)`,
  position: "absolute",
  bottom: 0,
  boxShadow: "rgb(0 0 0 / 9%) 0px -3px 5px",
};

export default function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoadMap = useCallback(setMap, []); // set map once map has loaded

  const { center, zoom, setZoom } = props;

  return (
    <GoogleMap
      options={{ clickableIcons: true }}
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
