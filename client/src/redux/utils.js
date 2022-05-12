export function getPosition(dispatch) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geoloaction not available");
    }
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "prompt" || result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve([position.coords.latitude, position.coords.longitude]);
            },
            (e) => reject(e)
          );
        } else if (result.state === "denied") {
          console.log(result.state);
        }
        result.onchange = function () {
          console.log("onchange ", result.state);
        };
      });
  });
}
