import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { useLocation } from "react-router";

const Map = React.memo(function Map({
  center,
  zoom,
  setZoom,
  containerStyle,
  mapStyle,
  placeId,
  setPlace,
  setClickedLocation,
  children,
}) {
  const [map, setMap] = useState(null);

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
        setPlace(place);
      } else {
        console.log("not ok");
      }
    }
  }, [map, placeId, setPlace]);

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
      onDblClick={(event) => {
        if (window.innerWidth > 600) {
          return;
        }
        setClickedLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }}
      onClick={(event) => {
        if (!map) return;
        if (window.innerWidth < 600) {
          return;
        }
        setClickedLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }}
      onCenterChanged={() => {
        if (map) {
          return;
        }
      }}
      onLoad={onLoad}
    >
      <>{children}</>
    </GoogleMap>
  );
});

export default Map;
