export function getPosition(dispatch) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geoloaction not available");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "GRANTED_GEO_PERMISSION",
          payload: true,
        });
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (e) => reject(e)
    );
  });
}
