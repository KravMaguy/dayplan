import axios from "axios";

export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geoloaction not available");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (e) => reject(e)
    );
  });
}

export const getPolicyLocation = async (key, lat, long) => {
  const reverseGeoUrl = "https://us1.locationiq.com/v1/reverse.php";
  const geoUrl = `${reverseGeoUrl}?key=${key}&lat=${lat}&lon=${long}&format=json`;
  const res = await axios.get(geoUrl);
  const { data } = res;
  const { county } = data.address;
  return county;
};
