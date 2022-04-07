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

const PlanPreview = () => {
  const params = useParams();
  const [sharedPlan, setSharedPlan] = useState([]);
  console.log({ sharedPlan });
  const center = sharedPlan[0]?.coordinates;
  console.log(center);
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.post("/get_shared_plan", { params });
      const { derivedData } = data;
      setSharedPlan(derivedData);
    };
    getUserData();
  }, [params]);

  return (
    <div className="map-container">
      <div className="map-wrapper">
        {center && (
          <Map
            zoom={10}
            center={{ lat: center.latitude, lng: center.longitude }}
            containerStyle={containerStyle}
          >
            <MarkerClusterer options={options}>
              {(clusterer) =>
                sharedPlan.map((location, idx) => (
                  <Marker
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
      </div>
    </div>
  );
};

export default PlanPreview;
