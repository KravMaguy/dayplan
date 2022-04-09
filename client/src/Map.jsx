import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLocation } from "react-router";
// const google = window.google;
const Map = React.memo(function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoad = useCallback(
    function onLoad(map) {
      setMap(map);
    },
    [setMap]
  );
  const location = useLocation();
  // useEffect(() => {
  //   if (map) {
  // var request = {
  //   placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  //   fields: ["name", "rating", "formatted_phone_number", "geometry"],
  // };
  // const service = new google.maps.places.PlacesService(map);
  // service.getDetails(request, callback);
  // function callback(place, status) {
  //   if (status == google.maps.places.PlacesServiceStatus.OK) {
  //     console.log(place);
  //   }
  // }
  //   }
  // }, [map]);
  const { pathname } = location;

  const { center, zoom, setZoom, containerStyle, mapStyle, setCenter } = props;
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
