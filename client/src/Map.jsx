import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
const google = window.google;
const Map = React.memo(function Map(props) {
  const [map, setMap] = useState(null); // map instance
  const onLoadMap = useCallback(setMap, [setMap]); // set map once map has loaded

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

  const { center, zoom, setZoom, containerStyle, mapStyle, setCenter } = props;
  console.log(setCenter, "the setcenter prop");
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
        if (map.zoom !== zoom) {
          setZoom(map.zoom);
        }
      }}
      onCenterChanged={() => {
        if (map === null) {
          return;
        }
        if (map.center !== center) {
          console.log(map.center.lat());
          console.log(map.center.lng());
          // const latitude=map.center.lat()
          // const longitude=map.center.lng()
          // setCenter({ latitude, longitude });
          // setCenter({ lat: map.center.lat(), lng: map.center.lng() });
        }
      }}
      onLoad={onLoadMap}
    >
      <>{props.children}</>
    </GoogleMap>
  );
});

export default Map;
