import { MarkerClusterer, Marker } from "@react-google-maps/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";

const containerStyle = {
  height: `100vh`,
};
const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};
const originalcenter = { lng: -87.71965, lat: 42.02793 };

const PlanPreview = () => {
  const params = useParams();
  const [sharedPlan, setSharedPlan] = useState([]);
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState(originalcenter);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.post("/get_shared_plan", { params });
      const { derivedData } = data;
      setSharedPlan(derivedData);
      const center = {
        latitude: derivedData[0].coordinates.latitude,
        longitude: derivedData[0].coordinates.longitude,
      };
      setCenter(center);
    };
    getUserData();
  }, [params]);

  const setNewCenter = (latitude, longitude) =>
    setCenter({ latitude, longitude });
  return (
    <>
      {sharedPlan.length > 0 && center && (
        <Map
          center={{ lat: center.latitude, lng: center.longitude }}
          containerStyle={containerStyle}
          zoom={zoom}
          setZoom={setZoom}
          setCenter={setCenter}
        >
          <MarkerClusterer options={options}>
            {(clusterer) =>
              sharedPlan.map((location, idx) => (
                <Marker
                  onClick={() =>
                    setNewCenter(
                      location.coordinates.latitude,
                      location.coordinates.longitude
                    )
                  }
                  key={idx}
                  position={{
                    lat: location.coordinates.latitude,
                    lng: location.coordinates.longitude,
                  }}
                  clusterer={clusterer}
                />
              ))
            }
          </MarkerClusterer>
        </Map>
      )}
    </>
  );
};

export default PlanPreview;
